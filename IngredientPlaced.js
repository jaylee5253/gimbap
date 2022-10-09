

cc.Class({
    extends: cc.Component,

    properties: {
        gameManager: cc.Component,
        id: '',
        orderInSlot: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    onTouch () 
    {
        
        console.log('onTouch')
        // if (this.id != 'gim' && this.id != 'rice')
        // {
        //     this.gameManager.innerIngredientCount--
        // }
        
        // 넣었던 list에서 뺀다
        /*
        const index = this.gameManager.ingredientsInRoller.indexOf(this.id);
        if (index > -1) 
        {
            this.gameManager.ingredientsInRoller.splice(index, 1);
        }   
        */
        if (this.id == 'gim' || this.id == 'rice')
        {
            // 다른재료있으면 김을 못빼게
            var isSomethingInSlot = false
            for (var i=0; i<this.gameManager.ingredientsInSlot.length; i++)
            {
                if (this.gameManager.ingredientsInSlot[i] != null && this.gameManager.ingredientsInSlot[i] != '')
                {
                    isSomethingInSlot = true
                    break
                }
            }
            if (isSomethingInSlot == true)
            {
                return
            }
            // isGim을 false로 바꾼다
            if (this.id == 'gim')
            {
                this.gameManager.isGim = false
            }
        }
        else 
        {
            this.gameManager.ingredientsInSlot[this.orderInSlot] = ''
        }

        this.node.removeFromParent()
    }

});
