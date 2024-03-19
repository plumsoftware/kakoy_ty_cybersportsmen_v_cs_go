//Конфиг
const imagesArray = [
   "back_2.webp",
   "back_3.jpg",
   "back_3.jpg",
   "back_9.jpg",
   "back_10.jpg"
];

function get_background_image() {
	const randomIndex = Math.floor(Math.random() * imagesArray.length);
	const randomImage = imagesArray[randomIndex];

	const backgroundImage = `url('res/backgrounds/${randomImage}')`;
	return backgroundImage;
}

document.getElementsByTagName('body')[0].style.background = get_background_image() + " no-repeat center center / cover";
document.addEventListener('contextmenu', event => event.preventDefault());

let icon = document.getElementById('icon');
let name = document.getElementById('name');
let coin = document.getElementById('coin');
let coin_ = document.getElementById('coin_');
let again = document.getElementById('again');
let skip = document.getElementById('skip');


//Yandex Games
var player;
YaGames
	.init()
	.then(ysdk => {
		window.ysdk = ysdk;
		console.log("Yandex SDK initialized");

		initPlayer().then(_player => {
        if (_player.getMode() === 'lite') {
            // Игрок не авторизован.
        		console.log("Игрок не авторизован");
            ysdk.auth.openAuthDialog().then(() => {
                    // Игрок успешно авторизован
                    initPlayer().catch(err => {
                        // Ошибка при инициализации объекта Player.
                    	console.log("Ошибка при инициализации объекта Player");
                    });
                }).catch(() => {
                    // Игрок не авторизован.
                		console.log("Игрок не авторизован");
                });
        }
    }).catch(err => {
        // Ошибка при инициализации объекта Player.
    		console.log("Ошибка при инициализации объекта Player");
    });

		ysdk.features.LoadingAPI?.ready();
		ysdk.adv.showFullscreenAdv({
    callbacks: {
        onClose: function(wasShown) {
          console.log("Full screen adv shown");
        },
        onError: function(error) {
          console.log("Full screen adv error");
        }
    }
	})
});
function initPlayer() {
    return ysdk.getPlayer().then(_player => {
            player = _player;

            return player;
        });
}



//Создание вопросов
class Question {
  constructor(question, answers) {
    this.question = question;
    this.answers = answers;
  }
}

var questions = [
	new Question('Любимая карта в CS GO', ['Inferno','Office','Dust 2','Я играю на всех картах']),
	new Question('Любимое оружие в CS GO', ['AUG','AK-47','AWP','Desert Eagle']),
	new Question('Сколько лет играешь в CS GO', ['0 - 1','2 - 4','4 - 6','Больше 6']),
	new Question('Самая не любимая карта в CS GO', ['Inferno','Train','Nuke','Dust 2']),
	new Question('Любимый плетн на Dust 2', ['A','B','C','D']),
	new Question('Любимый плетн на Mirage', ['A','B','C','D']),
	new Question('Сколько у тебя было эйсов', ['0 - 1','2 - 6','6 - 10','Больше 10']),
	new Question('Любимый режим', ['Выживание','Соревновательный','Напарники','Запретная зона']),
	new Question('Сколько раскидок на Dust 2 знаешь', ['0 - 1','2 - 4','4 - 6','Больше 6']),
	new Question('Сколько у тебя скинов', ['0 - 1','2 - 6','6 - 10','Больше 10']),
	new Question('Любимая команда', ['Virtus Pro','Navi','Astralis','Liquid Team']),
	new Question('Сколько часов в неделю играешь', ['0 - 4','4 - 6','6 - 12','Больше 12']),
	new Question('Сколько часов в день играешь', ['Меньше 1','1','2','Больше 2']),
	new Question('Твоя любимая версия игры', ['Counter-Strike 2','Counter-Strike 1.6','Counter-Strike: Global Offensive','Counter-Strike: Source']),
	new Question('Какая у тебя чувствительность мышки в игре', ['10 - 20','20 - 50','50 - 70','70 - 100']),
	new Question('Сколько часов в игре', ['Меньше 100','100 - 200','200 - 500','Больше 500']),
	new Question('На какие клавиши ходить в игре', ['W A S D','D S W A','← → ↑ ↓','Пробел']),
	new Question('У какого оружия есть глушитель', ['USP','AWP','AK-47','M4A1']),
	new Question('У какого оружия бóльший урон', ['Desert Eagle','AWP','M4A1','Дробовик']),
	new Question('Какая граната ослепляет', ['Молотов','AWP','Осколочная','Флэшка']),
	new Question('Как расшифровывается CS GO', ['Counter-Strike Global Offensive','Colic_Strike Global Offensive','Global Offensive Counter-Strike','Counter-Strike GO']),
	new Question('Какой баланс с начала игры', ['100$','1000$','800$','1500$']),
	new Question('Какое действие слышат окружающие игроки', ['Переключение зума на AWP','Переключение режима на Famas','Бросание оружия','Всё вышеперечисленное']),
	new Question('Можно ли запрыгивать на препяствия в CS GO', ['Да','Нет','Не на все','Можно']),
	new Question('Через дымовую гранату видно', ['Да','Нет','Видно, если пострелять','Видно, если бросить молотов']),
	new Question('Сколько плентов на карте Office', ['2','1','Их нет','3']),
	new Question('Сколько длится обезвреживание с4', ['10 секунд','40 секунд','60 секунд','Ни один варинт не подходит']),
	new Question('У mp9 и P90 одинаковая скорострельность', ['Правда','Ложь','В игре нет такого оружия','Правда']),
	new Question('Пули попадая в игрока замедляют его движение', ['Правда','Ложь','Ложь','Правда']),
	new Question('Как вы обычно выбираете тиммейтов в CS GO', ['По игровому стилю', 'По дружбе', 'Случайным образом', 'Меня зовут']),
	new Question('Как называют P90 игроки', ['Петух', 'Курочка', 'Лучшее оружие в игре', 'пистолет-пулемёт']),
	new Question('Сколько дробовиков  существует в игре', ['1', '2', '3', '4']),
	new Question('Сколько патронов у negev', ['90', '100', '150', '50']),
	new Question('Какой оружие наносит 999 урона', ['Электрошокер (зевс)', 'Ножик', 'AWP', 'Молотов']),
	new Question('Можно ли менять скин у персонажей', ['Да у всех', 'Нет', 'Не у всех', 'В игре только 2 персонажа']),
	new Question('Скин драгон-лор на...', ['P90', 'Galil', 'AWP', 'M4A4']),
	new Question('Какое оружие НЕ стреляет очередями', ['Famas', 'Dual berretas', 'Glock', 'USP']),
	new Question('Как часто ты играешь с глушителем', ['Всегда', 'Часто', 'Зависит от ситуации', 'Никогда']),
	new Question('Зачем ты играешь в кс го', ['Ради удовольствия', 'Хочу стать киберспортсменом', 'С друзьями веселюсь', 'Всё перечисленное']),
	new Question('Какое оружие стреляет очередями', ['Famas', 'Negev', 'Desert Eagle', 'AWP']),
	new Question('Как ты реагируешь на читеров в игре', ['Злюсь', 'Веселюсь', 'Кидаю репорты', 'Я сам читер']),
	new Question('Какое оружие самое мощное', ['AWP', 'Scar - 20', 'Револьвер', 'Five seven']),
	new Question('Что не из игры кс го', ['CZ 75 auto', 'AK - 47', 'MAG-7', 'P.U.D.G.']),
	new Question('Сколько в игре пистолетов-пулеметов', ['3', '4', '5', '6']),
	new Question('Что покупаешь на первом раунде', ['Five-seven', 'Броню', 'Ничего', 'Гранату']),
	new Question('С чем можно войти в прицел', ['Nova', 'AUG', 'Молотов', 'Револьвер']),
	new Question('Какая граната наносит больше урона', ['Осколочная', 'Ложная', 'Флэшка', 'Дымовая']),
	new Question('Сколько у тебя скинов', ['0-1', '2-4', '4-6', 'Больше 6']),
	new Question('Зачем нужны скины в кс го', ['С ними красиво', 'Не нужны, портят маскировку', 'Просто так', 'С ними получается лучше играть']),
	new Question('На что нет скина', ['с4', 'SSG', 'USP', 'Galil']),
	new Question('Сколько карт в игре', ['4', '5', '6', 'Больше 6']),
	new Question('Что делает кнопка Shift по умолчанию', ['Для бега', 'Быстро развернуться', 'Медленно идти', 'Быстро бросить гранату']),
	new Question('В каком режиме есть френдли фаер', ['В соревновательном', 'Бой', 'Запретная зона', 'Обычный']),
	new Question('Сколько патронов у Saffed off ', ['8', '9', '6', '7']),
	new Question('Какое у тебя звание', ['Сильвер', 'Глобал', 'Суприм', 'Беркут']),
	new Question('Какое звание самое высокое в игре', ['Глобал', 'Кароль', 'Тут нет такого', 'Сильвер']),
	new Question('Что такое ноу скоп', ['Выстрел без прицела', 'Выстрел в прыжке', 'Бесшумная ходьба', 'Выбросить оружие']),
	new Question('Сколько у тебя было ноу скопов', ['0-2', '2-5', '5-10', 'Больше 10']),
	new Question('На какой карте нужно спассать заложников', ['Assault', 'Dust 2', 'Italy', 'Nuke']),
	new Question('Сколько заложников можно спасти на карте Assault', ['Только 1', '4', '8', 'Нет верного ответа']),
	new Question('Какой карты нет в игре', ['Vertigo', 'Mirage', 'Zoo', 'Nuke']),
	new Question('Сколько подсадок знаешь на карте Dust 2', ['0-1', '2-3', '4-5', 'Больше 5']),
	new Question('Сколько подсадок знаешь на карте Mirage', ['0-1', '2-3', '4-5', 'Больше 5']),
	new Question('Сколько подсадок знаешь на карте Vertigo', ['0-2', '3-4', '5-6', 'Больше 6']),
	new Question('Сколько подсадок знаешь на карте Rialto', ['0-2', '3-4', '5-6', 'Больше 6']),
	new Question('Сколько подсадок знаешь на карте Nuke', ['0-1', '2-3', '4-5', 'Больше 5']),
	new Question('Сколько подсадок знаешь на карте Assault', ['0-1', '2-3', '4-5', 'Больше 5']),
	new Question('Сколько подсадок знаешь на карте Cache', ['Нет подсадок', '2-3', '4-5', 'Больше 5']),
	new Question('Сколько подсадок знаешь на карте Cobblestone', ['Нет подсадок', '2-3', '4-5', 'Больше 5']),
	new Question('Была раньше в игре карта Dust', ['Нет', 'Да, была', 'Планируют добавить', 'Есть сейчас в игре']),
	new Question('Сколько званий в кс го', ['10', '20', '18', '25']),
	new Question('Сколько званий типа Silver в кс го', ['8', '6', '5', '10']),
	new Question('Сколько званий типа Gold nova', ['5', '7', '4', '3']),
	new Question('Сколько существует званий типа  Master Guardian в кс го', ['3', '2', 'Нет такого звания', '4']),
	new Question('Что из перечисленного НЕ пистолет', ['P2000', 'Револьвер', 'пп - Бизон', 'USP']),
	new Question('Продолжи название: SSG...', ['20', '007', '08', '0']),
	new Question('Заверши название: SG...', ['500', '553', 'Ничего', '123']),
	new Question('UMP...', ['2000', '008', '45', '54']),
	new Question('Если с USP снять глушитель, то урон увеличиться', ['Верно', 'Неверно', 'В кс го нет такого', 'Глушитель нельзя снять']),
	new Question('Какое оружие было в кс го 1.6', ['Щит', 'Мечь', 'Кулаки', 'Всё перечисленное']),
	new Question('Сколько раундов в соревновательном режиме', ['15', '30', '10', '5']),
	new Question('Из скольки игроков состоит команда в соревновательном режиме', ['3', '5', '10', '2']),
	new Question('Что будет, если в соревновательном режиме выйдет игрок', ['Будет бот вместо него', 'Команда из 4 игроков', 'Ничего', 'Игра закончиться']),
	new Question('Сколько раундов нужно выиграть, чтобы победить в соревновательном режиме в кс го', ['10', '15', '30', '29']),
	new Question('Ты читерил в кс го', ['1 раз ради интереса', 'Постоянно', 'Никогда', 'Не скажу']),
	new Question('В кс го есть кейсы?', ['Нет', 'Были раньше', 'Да', 'Планируют добавить']),
	new Question('Зачем нужны кейсы в кс го', ['Просто так', 'Их нет в игре', 'Чтобы получить скины', 'Нет подходящего ответа']),
	new Question('Сколько у тебя наклеек в кс го', ['0-1', '2-4', '5-8', 'Больше 8']),
	new Question('В кс го есть наклейки на предметы?', ['Были раньше', 'Да, есть в  игре', 'Планируют добавить', 'Нет']),
	new Question('Что такое StatTrak в кс го?', ['Предмет с счётчиком', 'Такого нет в игре', 'Костюм на персонажа', 'Нет подходящего ответа']),
	new Question('Есть ли у тебя StatTrak в кс го?', ['Да', 'Нет', 'Да', 'Нет']),
	new Question('Существует ли в кс го консоль', ['Да', 'Нет', 'Да, но не во всех режимах игры', 'Не знаю']),
	new Question('Сколько консольных команд кс го знаешь', ['0-1', '2-3', 'Больше 3', 'Не пользуюсь консолью']),
	new Question('Сколько турниров по кс го смотрел', ['0', '1', '2', 'Больше 3']),
	new Question('Можно ли играть в кс го без интернета', ['Да', 'Нет', 'Да, но не во всех режимах', 'Нет подходящего ответа']),
	new Question('Какой бренд у твоей мышки', ['Razer', 'Dafander', 'Bloady', 'Не знаю']),
	new Question('Какой бренд у твоих наушников', ['Bloady', 'Dafander', 'Razer', 'Не знаю']),
	new Question('Какой мышкой ты пользуешься', ['Проводной', 'Беспроводной', 'Играю на тачпаде', 'Играю на джойстике']),
	new Question('Сколько секунд обезвреживается с4 в кс го', ['Моментально', '10', '20', '15']),
	new Question('Есть ли в кс го анимированные эмоции персонажей как в Фортнайте', ['Да', 'Нет', 'Не знаю', 'Есть, но не у всех']),
	new Question('Можно ли управлять транспортов в кс го как в Фортнайте', ['Да', 'Нет', 'Не знаю', 'Можно, но не во всех режимах']),
	new Question('Сколько снайперов в кс го', ['3', '4', '5', '6']),
	new Question('Есть ли скины на гранаты в кс го', ['Да', 'Да, но не на все', 'Нет', 'Не знаю']),
	new Question('Можно ли нанести урон флешкой в кс го', ['Да', 'Да, если попасть в игрока', 'Нет, только ослепить', 'Не знаю']),
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

questions = shuffleArray(questions);


//Работа с вопросами
const table = document.querySelector('table');
const buttons = document.querySelectorAll('button');
const header = document.querySelector('h1');
let currentQuestionIndex = 0;

var currentQuestion = questions[currentQuestionIndex]
header.innerText = currentQuestion.question;
for (let i = 0; i < currentQuestion.answers.length; i++) {
	buttons[i].innerText = currentQuestion.answers[i];
}

buttons.forEach((button, i) => {
	button.addEventListener('click', () => {
		currentQuestionIndex++;

			//Если последний вопрос
    	if (currentQuestionIndex >= questions.length) {
    		document.querySelector('table').style.display = 'none';
    		document.querySelector('h1').style.display = 'none';

    		icon.style.display = 'block';
    		name.style.display = 'block';
    		coin.style.display = 'block';
    		coin_.style.display = 'block';
    		again.style.display = 'block';

    		let c = get_cybersportsmen();

    		icon.src = `res/players/${c.icon}`;
    		name.innerText = c.name;
    		coin_.innerText = c.money;

    	} else {
    		var currentQuestion = questions[currentQuestionIndex]
				header.innerText = currentQuestion.question;
				for (let i = 0; i < currentQuestion.answers.length; i++) {
  					buttons[i].innerText = currentQuestion.answers[i];
				}
    	}
  	});
});

//Киберспортсмены
class CyberSportsmen {
	constructor(name, money, icon) {
    this.name = name;
    this.money = money;
    this.icon = icon;
  }
}

var cybersportsmenList = [
 new CyberSportsmen("s1mple", 1223054, "s1mple.jpg"),
 new CyberSportsmen("device", 1017035,"device.jpg"),
 new CyberSportsmen("NiKo", 999444, "niko.webp"),
 new CyberSportsmen("ZywOo", 875795, "zywoo.jpg"),
 new CyberSportsmen("electronic", 789117, "electronic.jpg"),
 new CyberSportsmen("coldzera", 786870, "coldzera.jpg"),
 new CyberSportsmen("Magisk", 701454, "magisk.jpg"),
 new CyberSportsmen("NAF", 645741, "naf.jpg"),
 new CyberSportsmen("dupreeh", 641298, "dupreeh.jpg"),
 new CyberSportsmen("gla1ve", 632283, "gla1ve.jpg"),
 // new CyberSportsmen("Xyp9x", 628050, "icon11"),
 // new CyberSportsmen("Brehze", 624381, "icon12"),
 // new CyberSportsmen("valde", 617565, "icon13"),
 // new CyberSportsmen("twistzz", 610540, "icon14"),
 // new CyberSportsmen("Koosta", 598089, "icon15"),
]

function get_cybersportsmen() {
	const randomIndex = Math.floor(Math.random() * cybersportsmenList.length);
	const randomCybersportsmen = cybersportsmenList[randomIndex];
	return randomCybersportsmen;
}

again.addEventListener('click', () => {
	document.querySelector('table').style.display = 'inline-table';
  document.querySelector('h1').style.display = 'block';

  icon.style.display = 'none';
  name.style.display = 'none';
  coin.style.display = 'none';
  coin_.style.display = 'none';
  again.style.display = 'none';

  currentQuestionIndex = 0;
});

//Ads

function skip_questions() {
	ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => {
          console.log('Video ad open.');
        },
        onRewarded: () => {
          console.log('Rewarded!');

          currentQuestionIndex = 0;

          document.querySelector('table').style.display = 'none';
	    		document.querySelector('h1').style.display = 'none';

	    		icon.style.display = 'block';
	    		name.style.display = 'block';
	    		coin.style.display = 'block';
	    		coin_.style.display = 'block';
	    		again.style.display = 'block';

	    		let c = get_cybersportsmen();

	    		icon.src = `res/players/${c.icon}`;
	    		name.innerText = c.name;
	    		coin_.innerText = c.money;
        },
        onClose: () => {
          console.log('Video ad closed.');
        }, 
        onError: (e) => {
          console.log('Error while open video ad:', e);

          currentQuestionIndex = 0;

          document.querySelector('table').style.display = 'none';
	    		document.querySelector('h1').style.display = 'none';

	    		icon.style.display = 'block';
	    		name.style.display = 'block';
	    		coin.style.display = 'block';
	    		coin_.style.display = 'block';
	    		again.style.display = 'block';

	    		let c = get_cybersportsmen();

	    		icon.src = `res/players/${c.icon}`;
	    		name.innerText = c.name;
	    		coin_.innerText = c.money;
        }
    }
	});
}
// skip.addEventListener('click', () => {
	
// });