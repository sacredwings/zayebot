import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

//класс для работы с аккаунтами ВК
class vk {

    //загрузка новостей
    static async messages_getHistory (_this, account) {

        //если поля не заполнены
        if ((!account.chat_like_id) || (!account.chat_like_count) || (!account.chat_like_message) || (account.chat_like_message === ''))
            throw ({msg: 'Поля заполнены не верно'});

        //НАСТРОЙКИ ФОРМЫ
        let mesSendPeerId = 2000000000 + Number (account.chat_like_id);
        let mesSendCount = account.chat_like_count; //сколько лайков нужно сделать
        let mesSendMessage = account.chat_like_message; //текст сообщения
        let mesSendRandomId = parseInt(new Date().getTime()/1000);
        let mesGetCount = 200; //количество загружаемых сообщений

        console.log('mesSendCount')
        console.log(mesSendCount)

        //ОТПРАВКА СООБЩЕНИЯ В ЧАТ И ЗАГРУЗКА СООБЩЕНИЙ ИЗ ЧАТА
        let code = [];

        code[code.length] = `var messages_send = API.messages.send({"random_id":"${mesSendRandomId}","peer_id":${mesSendPeerId},"message":"${mesSendMessage}"});`;
        //code[code.length] = `var messages_send = false;`;
        code[code.length] = `var messages_getHistory = API.messages.getHistory({"peer_id":${mesSendPeerId},"count":"${mesGetCount}"});`;

        code[code.length] = `return {
            "messages_send":messages_send,
            "messages_getHistory":messages_getHistory
        };`;

        //подготовка для добавления в основной запрос
        code = code.join(' '); //в строку

        //основной запрос
        let url = `https://api.vk.com/method/execute?code=${code}&access_token=${account.soc_token}&v=5.103`;
        url = encodeURI(url); //кодируем в url
        let getHistory = await axios({
            method: 'get',
            url: url,
            adapter: jsonpAdapter,
            headers: {'User-Agent': account.browser}
        });

        //результат запроса
        console.log(getHistory.data.response)

        //пустой чат
        if ((!getHistory.data.response.messages_getHistory) || (!getHistory.data.response.messages_getHistory.items.length))
            throw ({msg: 'В чате нет сообщений'});

        //упрощение /извлечение массива
        let arMessage = getHistory.data.response.messages_getHistory.items;

        //ИЗВЛЕЧЕНИЕ ИЗ МАССИВА СООБЩЕНИЙ МАССИВА ССЫЛОК НА ПОСТЫ
        let arPost = [];
        //поиск и отделение id страницы и поста
        for (let message of arMessage) {

            //в нижний регистр
            message.text = message.text.toLowerCase()

            //поиск слова wall
            if ((message.text.indexOf('wall') < 0) && (message.text.indexOf('video') < 0) && (message.text.indexOf('photo') < 0))
                continue;

            if (message.text.indexOf('wall') > 0) {
                //обрезаем текст после - wall
                message.text = message.text.split('wall');
                message.text = message.text[1];
            }
            if (message.text.indexOf('video') > 0) {
                //обрезаем текст после - wall
                message.text = message.text.split('video');
                message.text = message.text[1];
            }

            if (message.text.indexOf('photo') > 0) {
                //обрезаем текст после - wall
                message.text = message.text.split('photo');
                message.text = message.text[1];
            }

            //обрезаем текст после - пробела
            message.text = message.text.split(' ');
            message.text = message.text[0];

            //обрезаем текст после - %
            message.text = message.text.split('%');
            message.text = message.text[0];

            //обрезаем текст после - красной строки
            message.text = message.text.split('\n');
            message.text = message.text[0];

            //обрезаем текст после - #
            message.text = message.text.split('#');
            message.text = message.text[0];

            //обрезаем текст после - ?
            message.text = message.text.split('?');
            message.text = message.text[0];

            //сохранение для запроса
            arPost[arPost.length] = message.text;

            //после выгрузки в 200 сообщений, достаем ссылки и оставляем только указанное количество +5 - резерв
            if (arPost.length-5 > mesSendCount)
                break;

        }

        //извлеченные ссылки на посты
        console.log(arPost)

        //нечего лайкать
        if (!arPost.length)
            throw ({msg: 'Не смог извлечь ссылки из чата'});

        //ЗАГРУЗКА НАСТОЯЩИХ СУЩЕСТВУЮЩИХ ПОСТОВ
        code = `var arPost = API.wall.getById({"posts":"${arPost.join(',')}"});`;
        code += `return arPost;`;

        url = `https://api.vk.com/method/execute?code=${code}&access_token=${account.soc_token}&v=5.103`;

        //запрос
        console.log(url)

        code = encodeURI(code); //кодируем в url
        let wallGetById = await axios({
            method: 'get',
            url: url,
            adapter: jsonpAdapter,
            headers: {'User-Agent': account.browser}
        });

        //нечего лайкать
        if ((!wallGetById.data.response) || (!wallGetById.data.response.length))
            throw ({msg: 'Нет постов после проверки'});

        //упрощение /извлечение постов
        wallGetById = wallGetById.data.response;

        //сумма лайков для формы
        _this.setState({chatCount: mesSendCount})


        //--------------------------------------------------------------------------------------------------------------
        //СОХРАНЕНИЕ ЗАГРУЖЕННЫХ ПОСТОВ ДЛЯ ЛАЙКОВ
        //открываем базу
        let db = openDatabase("dbLike", `1.0`, "Очередь постов", 2*1024*1024);

        //добавляем данные в базу
        let dbTransaction = new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(`CREATE TABLE IF NOT EXISTS posts (p_id TEXT, p_type TEXT, from_id TEXT, p_create DATETIME)`, null, res=>{console.log('ура TABLE')}, res=>{console.log('нет TABLE')})
                tx.executeSql(`CREATE UNIQUE INDEX IF NOT EXISTS posts_id ON posts (p_id, p_type, from_id);`, null, res=>{console.log('ура INDEX')}, res=>{console.log('нет INDEX')})

                //минимальное время
                let max = 1000;

                wallGetById.forEach(function(item, i, arr) {

                    //выход если лайков больше чем указано
                    if (i >= mesSendCount)
                        return;

                    //добавляем в базу
                    tx.executeSql("INSERT INTO posts (p_id, p_type, from_id, p_create) values(?, ?, ?, datetime('now'))", [`${item.id}`, `${item.post_type}`, `${item.from_id}`], res=>{console.log(`ура ${item.id}`)}, res=>{console.log(`нет ${item.id}`)});

                    //+ 1 секунды от последнего однозначно
                    max += 5000;

                    //+ до 5 секунд
                    max = getRandomIntInclusive(max, max+15000)

                    setTimeout(async () => {


                        //удаляем записи которые уже лайкнуты
                        db.transaction((tx) => {
                            tx.executeSql("DELETE FROM posts WHERE p_id=? AND p_type=? AND from_id=?", [`${item.id}`, `${item.post_type}`, `${item.from_id}`], res => {
                                console.log(`ура ${item.id}`)
                            }, res => {
                                console.log(`нет ${item.id}`)
                            });
                        });

                        console.log(_this.state.chatCount)
                        _this.setState({chatCount: mesSendCount-i-1})

                        let url = `https://api.vk.com/method/likes.add?type=${item.post_type}&owner_id=${item.from_id}&item_id=${item.id}`
                        //let code = `var addLike = API.likes.add({"type":"${item.post_type}", "owner_id":"${item.from_id}", "item_id":"${item.id}"});`;
                        //code += `return addLike;`;
                        url += `&access_token=${account.soc_token}&v=5.103`;
                        console.log(url)
                        url = encodeURI(url); //кодируем в url
                        console.log(url)
                        let wallGetById = await axios({
                            method: 'get',
                            url: url,
                            adapter: jsonpAdapter,
                            headers: {'User-Agent': account.browser}
                        });
                    }, max)

                });
                resolve()
            })

        })

        //выполняем функцию
        await dbTransaction;


        console.log('конец транзакции, жду завершение симуляции')

        return true;

        /*
        //сбор запроса для лайков
        let arCodeLike = [];
        let likeCount = 0;

        wallGetById.forEach(function(item, i, arr) {

            //выход если лайков больше чем указано
            if (i >= like_count)
                return;

            //чтобы не было undefined
            if (!arCodeLike[Math.floor(i/25)])
                arCodeLike[Math.floor(i/25)] = '';

            arCodeLike[Math.floor(i/25)] += `var likes_add_${i} = API.likes.add({"type":"${item.post_type}", "owner_id":"${item.from_id}", "item_id":"${item.id}"});`
            likeCount = i;
        });

        for (let code of arCodeLike) {
            url = `https://api.vk.com/method/execute?code=${code}&access_token=${account.soc_token}&v=5.103`;
            code = encodeURI(code); //кодируем в url
            console.log(url)


            let wallGetById = await axios({
                method: 'get',
                url: url,
                adapter: jsonpAdapter,
                headers: {'User-Agent': account.browser}
            });
        }*/

        //количество найденных постов для лайка
        return; //likeCount+1;



    }

}

export default vk;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}