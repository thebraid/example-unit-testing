const makePotionsShelve = require('./makePotionsShelve');

describe('makePotionsShelve', () => {
    it('Метод "takePotion" удаляет зелье с полки', () => {
        // Подготовка
        const shelve = makePotionsShelve([{ name: 'Оборотное зелье' }]);

        // действие
        shelve.takePotion('Оборотное зелье')

        // проверка результата
        // expect(shelve.store.length).toBe(0)
        expect(shelve.store).toHaveLength(0)
    })

    it('Метод "add" добавляет зелье на полку', () => {
        // Подготовка
        const shelve = makePotionsShelve();

        // действие
        shelve.add({ name: 'Оборотное зелье' });

        // проверка результата
        expect(shelve.store.map(potion => potion.name)).toContain('Оборотное зелье');
    })

    it('Данные загружаются от сервера', async () => {
        // подготовка
        const fetcher = jest.fn(() => Promise.resolve([{ name: 'Оборотное зелье' }]));
        const shelve = makePotionsShelve([], fetcher);

        // действие
        await shelve.load();

        // проверка результата
        expect(shelve.store).toHaveLength(1);
    })

    it('Данные выгружаются на сервер', async () => {
        // подготовка
        const fetcher = jest.fn();
        const shelve = makePotionsShelve([], fetcher);

        // действие
        shelve.add({ name: 'Оборотное зелье' });
        await shelve.sync();

        // проверка результата
        // 0 - порядковый номер запроса
        // 1 - порядковый номер аргумента функции
        const body = JSON.parse(fetcher.mock.calls[0][1].body);

        expect(body).toEqual([{ name: 'Оборотное зелье' }])
    })
})