const users = [
  {
    id: 0,
    fio: "Пиляев Вадим Сергеевич",
    position: "Frontend developer",
    phone: "+7 (000) 000 00-05",
    image: "../assets/avatar-vadim.png",
    boss: 100,
    inferiors: []
  },
  {
    id: 5,
    fio: "Путин Владимир Владимирович",
    position: "Президент",
    phone: "+7 (000) 000 00-06",
    image: "",
    boss: '',
    inferiors: [100,101,102,103,104]
  },
  {
    id: 100,
    fio: "Дми́трий Анато́льевич Медве́дев",
    position: "Председатель правительства РФ",
    phone: "+7 (000) 000 01-00",
    image: "",
    boss: 5,
    inferiors: []
  },
  {
    id: 101,
    fio: "Влади́мир Алекса́ндрович Колоко́льцев",
    position: "Министр внутренних дел",
    phone: "+7 (000) 000 01-01",
    image: "",
    boss: 5,
    inferiors: []
  },
  {
    id: 102,
    fio: "Влади́мир Ростисла́вович Меди́нский",
    position: "Министр культуры",
    phone: "+7 (000) 000 01-02",
    image: "",
    boss: 5,
    inferiors: []
  },
  {
    id: 103,
    fio: "Серге́й Кужуге́тович Шойгу́",
    position: "Министр обороны",
    phone: "+7 (000) 000 01-03",
    image: "",
    boss: 5,
    inferiors: []
  },
  {
    id: 104,
    fio: "Серге́й Ви́кторович Лавро́в́",
    position: "Министр иностранных дел",
    phone: "+7 (000) 000 01-04",
    image: "",
    boss: 5,
    inferiors: []
  },
];
module.exports = () => {
	return users;
};
