const MaxIngredientSlot = 6;

cc.Class({
    extends: cc.Component,

    properties: {
        roller: cc.Node,
        rolledGimbap: cc.Node,
        ingredients: [cc.Sprite],
        ingredientsInSlot: [0],
        isGim: false,
        isShowingIngredientError: false,
        ingredientPrefab: cc.Prefab,
        isMouseDownOnRollPad: false,
        rollPad: cc.Node,
        cutPadTop: cc.Node,
        cutPadBottom: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.ingredientsInSlot.length = MaxIngredientSlot
        
        this.rollPad.on('mousedown', function (event) {
            console.log('Roll Pad Mouse down');
            this.isMouseDownOnRollPad = true
        }, this);

        this.roller.on('mouseup', function (event) {
            console.log('Roller Mouse up');
            //console.log(this.isMouseDownOnRollPad)
            if (this.isMouseDownOnRollPad == true)
            {
                this.roller.removeAllChildren() 
                this.rolledGimbap.active = true
            }
            this.isMouseDownOnRollPad = false
        }, this);

        this.roller.on('mousedown', function (event) {
            console.log('Roller Mouse down');
            this.isMouseDownOnRollPad = false
        }, this);
    },

    // called every frame
    update: function (dt) {

    },

    OnTouchIngredient: function (event, id) {
        console.log("id: ", id);
        
        var isFull = true
        var emptySlot 
        // 빈자리 찾는다
        for (var i=0; i<this.ingredientsInSlot.length; i++)
        {
            if (this.ingredientsInSlot[i] == null || this.ingredientsInSlot[i] == '')
            {
                isFull = false
                emptySlot = i
                break
            }
        }
        console.log("isFull:", isFull)
        if (isFull)
        {
            return
        }

        if (this.isShowingIngredientError == true)
        {
            return
        }
    
        // 큰재료
        var largeIngredient = cc.instantiate(this.ingredientPrefab) 
        largeIngredient.getComponent('IngredientPlaced').gameManager = this
        largeIngredient.getComponent('IngredientPlaced').id = id
        //이미지
        for (var i=0; i<this.ingredients.length; i++)
        {
            //console.log(this.ingredients[i].node.name)
            if (this.ingredients[i].node.name == id)
            {
                largeIngredient.getComponent(cc.Sprite).spriteFrame = this.ingredients[i].spriteFrame
            }
        }
        //넣어주고
        this.roller.addChild(largeIngredient)
       
        if (id != 'gim' && id != 'rice') 
        {
            //this.innerIngredientCount++
            //largeIngredient.y = this.roller.height / 2 - 100 * this.innerIngredientCount

            largeIngredient.y = this.roller.height / 2 - 100 * (emptySlot + 1)
            if (this.isGim == false) // 반투명, 김 전에 들어감
            {
                this.isShowingIngredientError = true
                //this.innerIngredientCount--
                largeIngredient.opacity = 128
                var self = this
                setTimeout(function()
                { 
                    largeIngredient.removeFromParent()   
                    self.isShowingIngredientError = false   
                }, 500); 
                return 
            }
            else  
            {
                largeIngredient.getComponent('IngredientPlaced').orderInSlot = emptySlot
                this.ingredientsInSlot[emptySlot] = id
            }
        }  
        else 
        {
            if (id == 'gim')
            {
                this.isGim = true
            }
            largeIngredient.scale = 1.1
        }
            
        
    },


});