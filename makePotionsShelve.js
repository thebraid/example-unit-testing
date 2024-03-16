const makePotionsShelve = (initStore = [], fetcher = fetch) => {
    return {
        store: initStore,

        add: function(potion) {
            this.store.push(potion);
        },

        takePotion: function(potionName) {
            const potionIndex = this.store.findIndex(potion => potion.name === potionName);

            if (potionIndex === -1) {
                return;
            }

            const [potion] = this.store.splice(potionIndex, 1);

            return potion;
        },

        load: function() {
            return fetcher('http://localhost:8000/load')
                .then(potions => {
                    this.store = potions;
                })
        },

        sync: function() {
            return fetcher('http://localhost:8000/sync', {
                method: 'post',
                body: JSON.stringify(this.store)
            })
        }
    }
}

module.exports = makePotionsShelve;