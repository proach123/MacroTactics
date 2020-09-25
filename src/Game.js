import {INVALID_MOVE} from 'boardgame.io/core';
import decklist from './Decklist';
import { Stage } from 'boardgame.io/core';
import { ActivePlayers } from 'boardgame.io/core';

export const MacroTactics = {
    
    setup: (ctx) => ({ 
        player0Deck: [{name: 'Slice', desc:`Deal 2 dmg`, func: dealDmg(ctx,2), key: 0,owner: '0',type: 'card', },
        {name: 'Heal' ,desc:'Heal 1 point of dmg',key: 1, owner: '0',type: 'card',}
        ,{name:'Slice', desc:'Deal 2 points of dmg',key: 2, owner: '0',type: 'card',},
        {name:'Raise Gauntlet', desc:'Add one point of armor until start of next turn',key: 3, owner: '0',type: 'card',},

         {name:'drawTwo', desc:'Draw two cards',key: 6, owner: '0',type: 'card',},
         {name:'Found Penny', desc:'adds 1 Gp to your treasury',key: 8, owner: '0',type: 'card',},
         {name:'Raise Gauntlet', desc:'adds 1 armor until start of next turn',key: 14, owner: '0',type: 'card',},
        ],

         player1Deck: [{name: 'Slice', desc:`Deal 2 dmg`, func: dealDmg(ctx,2), key: 0,owner: '1',type: 'card', },
         {name: 'Heal' ,desc:'Heal 1 point of dmg',key: 1, owner: '1',type: 'card',}
         ,{name:'Slice', desc:'Deal 2 points of dmg',key: 2, owner: '1',type: 'card',},
         {name:'Raise Gauntlet', desc:'Add one point of armor until start of next turn',key: 3, owner: '1',type: 'card',},

          {name:'drawTwo', desc:'Draw two cards',key: 6, owner: '1',type: 'card',},
          {name:'Found Penny', desc:'adds 1 Gp to your treasury',key: 8, owner: '1',type: 'card',},
          {name:'Raise Gauntlet', desc:'adds 1 armor until start of next turn',key: 14, owner: '1',type: 'card',},
         ],

        marketDeck: [
            {name:'discardTwo', desc:'Opponent discard two cards',key: 7, owner: '',type: 'card',},
            {name:'randomheal', desc:'heal between 1 and 6 health',key: 5, owner: '',type:'card',cost:1},
            {name:'Wish Hammer', desc:'deal random damage between 1 and 6', key: 4, owner: '',type:'card',cost:1},
            {name: 'Mend Wounds' ,desc:'your heals become 1 point stronger',key: 9, owner: '',type: 'card',cost: 1,},
            {name: 'Combat trick' ,desc:'deal 1 damage then draw a card',key: 10, owner: '',type: 'card',cost: 1,},
            {name: 'Combat trick' ,desc:'deal 1 damage then draw a card',key: 11, owner: '',type: 'card',cost: 1,},
            {name: 'Rage' ,desc:'Grant yourself Rage. Attacks do double damage',key: 12, owner: '',type: 'card',cost: 3,},
            {name: 'Power Shift' ,desc:'deal damage to player equal to cards in hand. Both players discard thier hands',key: 13, owner: '',type: 'card',cost: 3,},
            {name: 'Power Gauntlet',desc:'attacks deal 1 extra dmg',key: 'relic-3',owner:'',type: 'relic',cost:1},
            {name: 'Power shield',desc:'Add one point of perm armor',key: 'relic-2',owner:'',type: 'relic',cost:1,},
            {name: 'Power Gauntlet',desc:'attacks deal 1 extra dmg',key: 'relic-1',owner:'0',type: 'relic',cost:1},
        ],
   
//lastest card key#: 14
//latest relic #: relic-3

        player0HealStr: 1,
        player1HealStr: 1,
        player0LifeMax: 10,
        player1LifeMax: 10,
        player0Armor: 0,
        player1Armor: 0,
        player0AttackMultiplyer: 1,
        player1AttackMultiplyer:1,
        player0AttackAdd: 0,
        player1AttackAdd: 0,
        player0Relics: [],
        player1Relics: [],

        player0Graveyard: [],
        player1Graveyard: [],

        intialShuffle: false,

        playerHasDrawn: false,
        playerHasPlayed: false,

        player0Hand: [], // player hand needs to randomize 2 into it.

        permArmor1: 0,
        permArmor0: 0,

        player1Hand: [],

        player1Board: [],
        player1Gold: 0,
                    //wheat,meat,wood,stone,metal,gold
        player0Board: [],
        player0Gold: 0,
                    //wheat,meat,wood,stone,metal,gold

        firstDraw: false,

        player0LifeTotal: 10, // player life total
        player1LifeTotal: 10,

        firstPlay:0,
    }),

    phases: {
        start: {
            moves: {ShuffleDecks,Player0DrawCard, Player1DrawCard,CheckRelics},
            endIf: G => (G.intialShuffle),
            start: true,
            next: 'normal',
            onBegin: (G,ctx) => {
                ShuffleDecks(G,ctx)
                CheckRelics(G,ctx,false)
            },
        },
        normal:{
            moves: {EndTurn},
            endIf: G => (G.playerHasDrawn),
            onBegin: (G,ctx) => {
                G.player0Armor = (G.permArmor0)
                G.player1Armor = (G.permArmor1)
            },
            onEnd: (G, ctx) => { G.playerHasDrawn = false }
        },

    },
    

    turn : {

        stages:{
            draw:{
                start: true,

                moves:{Player0DrawCard, Player1DrawCard,EndTurn},
                
                next: 'play',
            },
            play:{
                moves: {PlayCard,BuyCard,EndTurn},
                
                next:'play2',
            },
            play2:{
                moves:{PlayCard,BuyCard,EndTurn},
                next:'draw',
            },
            
        },
        moveLimit: 3
    }, // maybe have a move limit change.

    moves : {
        // changeStage: (G, ctx) => {
        //     ctx.events.setStage('draw', { moveLimit: 1 });
        //   },
        Player0DrawCard,
        Player1DrawCard,
        dealDmg,
        healDmg,
        ShuffleDecks,
        PlayCard,
        InvalidMove,
        BuyCard,
        CheckRelics,
        EndTurn,
    },
    

    endIf: (G, ctx) => {
        if (G.player0LifeTotal <= 0) {
          return { winner: 1 };
        }
        if (G.player1LifeTotal <= 0) {
            return { winner: 0 };
          }
        if(G.marketDeck.length <=3){

            if(G.player0LifeTotal > G.player1LifeTotal){
                return {winner: 0}
            } else if(G.player1LifeTotal > G.player0LifeTotal){
                return { winner: 1}
            } else return {winner: undefined}
        }
      },

    playerView: (G, ctx, playerId) => G,

    // ai: {
    //     enumerate: (G, ctx) => {
    //         let moves = []
    //         for(let i = 0; i < 6; i++){
    //             if (G.player1Hand[i] === null){
    //                 moves.push({move: 'Player1DrawCard', args:[i]})
    //             }
    //         }
    //     }
    // },
    
    
};


// function TickLife(G, ctx,damage){
//     G.lifeTotal[ctx.currentPlayer] = G.lifeTotal[ctx.currentPlayer] - damage;
// }

function InvalidMove(G,ctx){
    return(INVALID_MOVE)
}

function Player0DrawCard(G, ctx, drawCount=1) {
    let drawIndex = drawCount -1

    if (G.player0Deck[drawIndex +1] == undefined) {
        console.log('hit graveyard')
        G.player0Deck = [...G.player0Deck,...G.player0Graveyard]
        G.player0Graveyard = []
        G.player0Deck = [...ctx.random.Shuffle(G.player0Deck)]
        //deck gets replaced by graveyard then graveyard returns to an arra then deck shuffles, then normal draw happens.
        //this works because boardgame.io handles the immutiblity behind the scenes and lets us do things like this to the G obj.
    } 

        if(G.player0Deck[drawIndex]){
            for(let i = 0;i < drawCount; i++){
    
                G.player0Hand.push(G.player0Deck[0])
                G.player0Deck.shift()
            
            }
        }
    

        G.player0Armor = (G.permArmor0)

    ctx.events.setActivePlayers({ all: 'play' });
}

function Player1DrawCard(G, ctx, drawCount=1){
    let drawIndex = drawCount -1

    if (G.player1Deck[drawIndex +1] == undefined) {
        console.log('hit graveyard')
        G.player1Deck = [...G.player1Deck,...G.player1Graveyard]
        G.player1Graveyard = []
        G.player1Deck = [...ctx.random.Shuffle(G.player1Deck)]
        //deck gets replaced by graveyard then graveyard returns to an arra then deck shuffles, then normal draw happens.
        //this works because boardgame.io handles the immutiblity behind the scenes and lets us do things like this to the G obj.
    } 

        if(G.player1Deck[drawIndex]){
            for(let i = 0;i < drawCount; i++){
    
                G.player1Hand.push(G.player1Deck[0])
                G.player1Deck.shift()
            
            }
        }

    
    G.player1Armor = (G.permArmor1)

    ctx.events.setActivePlayers({ all: 'play', moveLimit: 1 });
}

function BuyCard(G,ctx,card){
    const player = ctx.currentPlayer;
    if(player == 0){
        if(card.cost <= G.player0Gold){
            G.player0Gold = (G.player0Gold - card.cost)
            if(card.type === 'relic'){
                G.player0Relics = [...G.player0Relics,card]
                CheckRelics(G,ctx,card)

            }
            if(card.type === 'card'){
                G.player0Graveyard = [...G.player0Graveyard,card]
            }
        } else return (INVALID_MOVE)
    }
    if(player == 1){
        if(card.cost <= G.player1Gold){
            G.player1Gold = (G.player1Gold - card.cost)
            if(card.type === 'relic'){
                G.player1Relics = [...G.player1Relics,card]
                CheckRelics(G,ctx,card)
            }
            if(card.type === 'card'){
                G.player1Graveyard = [...G.player1Graveyard,card]
            }
            
        }
    }

    let marketIndex = G.marketDeck.findIndex((obj) => {
        return obj.key == card.key
    })

    G.marketDeck.splice(marketIndex,1)

    if(G.firstPlay === 0){
        G.firstPlay = 1;
        ctx.events.setActivePlayers({ all: 'play2' });
    }else

    if(G.firstPlay === 1){
        G.firstPlay = 0
        ctx.events.setActivePlayers({all: 'draw'})
    }
}

function PlayCard(G, ctx, cardId){
    const player = ctx.currentPlayer
    console.log(cardId)
    if(cardId === 0){
        dealDmg(G,player,2)
    }

    if(cardId === 1){
        healDmg(G,player,1)
    }

    if(cardId === 2){
        dealDmg(G,player,2)
    }

    if(cardId === 3){
        addArmor(G,ctx,1)
    }

    if(cardId === 4){
        dealDmg(G,player,ctx.random.Die(6)) // random die roll of 6
    }

    if(cardId === 5){
        healDmg(G, player, ctx.random.Die(6)) //random die roll of 6
    }

    if(cardId === 6){
        if(ctx.currentPlayer == 0){
            Player0DrawCard(G,ctx,2)
        }
        if(ctx.currentPlayer == 1){
            Player1DrawCard(G,ctx,2)
        }
    }

    if(cardId === 7){
        if(ctx.currentPlayer == 0){
            discardCards(G,ctx,0,2)
        }
        if(ctx.currentPlayer == 1){
            discardCards(G,ctx,1,2)
        }
    }

    if(cardId === 8){
        if(ctx.currentPlayer == 0){
            player0AddGold(G,ctx)
        }
        if(ctx.currentPlayer == 1){
            player1AddGold(G,ctx)
        }
    }
    
    if(cardId === 9){
        increasePlayerHeals(G,ctx)
    }

    if(cardId === 10 || cardId === 11){
        if(ctx.currentPlayer == 0){
            Player0DrawCard(G,ctx)
        }
        if(ctx.currentPlayer == 1){
            Player1DrawCard(G,ctx)
        }
        dealDmg(G,player,1)
    }

    if(cardId === 12){
            increasePlayerPower(G,ctx)
    }

    if(cardId === 13){
        powerShift(G,ctx)
    }

    if(cardId === 14){
        addArmor(G,ctx,1)
    }
        

// need to find a way to put card in graveyard after use
    if(ctx.currentPlayer == 0){
        for (let i = 0; i < G.player0Hand.length; i++) {
            if(G.player0Hand[i].key === cardId){
                G.player0Graveyard.push(G.player0Hand[i])
                G.player0Hand.splice(i,1)
                i = G.player0Hand.length; //end the loop if the element is found
            }   
        }

    }

    if(ctx.currentPlayer == 1){
        for (let i = 0; i < G.player1Hand.length; i++) {
            if(G.player1Hand[i].key === cardId){
                G.player1Graveyard.push(G.player1Hand[i])
                G.player1Hand.splice(i,1)
                i = G.player1Hand.length; //end the loop if the element is found
            }   
        }

    }
    
    G.playerHasPlayed = true

    if(G.firstPlay === 0){
        G.firstPlay = 1;
        ctx.events.setActivePlayers({ all: 'play2' });
    }else

    if(G.firstPlay === 1){
        G.firstPlay = 0
        ctx.events.setActivePlayers({all: 'draw'})
    }

    
}


 

function ShuffleDecks(G, ctx,deck=2){
    //need to find a way to automatically do this.

    if(deck === 2){
        G.player0Deck = ctx.random.Shuffle(G.player0Deck)
        G.player1Deck = ctx.random.Shuffle(G.player1Deck)
        G.marketDeck = ctx.random.Shuffle(G.marketDeck)
        Player0DrawCard(G,ctx,3)
        Player1DrawCard(G,ctx,3)
        G.intialShuffle = true
        ctx.events.setStage('draw')
    }

}


function dealDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.

    console.log(`the player who damaged ${player}`)
    if(player == 0){
        G.player1LifeTotal = (G.player1LifeTotal + G.player1Armor) - ((num * G.player0AttackMultiplyer) + G.player0AttackAdd)
    }
    if (player == 1){
        G.player0LifeTotal = (G.player0LifeTotal + G.player0Armor) - ((num * G.player1AttackMultiplyer) + G.player1AttackAdd)
    }
}

function healDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.
    

    if(player == 0){
        if(G.player0LifeMax >= (G.player0LifeTotal+(num * G.player0HealStr))){
            G.player0LifeTotal = G.player0LifeTotal + (num * G.player0HealStr)
        } else{
            G.player0LifeTotal = G.player0LifeMax
        }
    }
    if (player == 1){
        if(G.player1LifeMax >= (G.player1LifeTotal+(num * G.player1HealStr))){
            G.player1LifeTotal = G.player1LifeTotal + (num * G.player1HealStr)
        } else{
            G.player1LifeTotal = G.player1LifeMax
        }
    }
}

async function discardCards(G,ctx,player,num=2){
    console.log('hit')
    
    if(player == 0){

        if(G.player1Hand[1] == null){
            num = 1
            let die = [0]
            await discard0Helper(G,num,die)
        }
        else if(G.player1Hand.length ==2){
            num = 2
            let die = [0,1]
            await discard0Helper(G,num,die)
        }
        else if(G.player1Hand[0]){

                  
            let die = ctx.random.Die(G.player1Hand.length -1,num)

            while(die[0] === die[1]|| die[0] === die[2] || die[1] === die[2]){
                die = ctx.random.Die(G.player1Hand.length -1, num)
            }
            await discard0Helper(G,num,die)
        }
    }
    if (player == 1){

        if(G.player0Hand[1] == null){
            num = 1
            let die = [0]
            await discard1Helper(G,num,die)
            
        }
        else if(G.player0Hand.length == 2){
            num = 2
            let die = [0,1]
            await discard1Helper(G,num,die)
        }
        
        else if(G.player0Hand[0]){

            let die = ctx.random.Die(G.player0Hand.length -1,num)
            console.log(die,'this is the die')

            while(die[0] === die[1]|| die[0] === die[2] || die[1] === die[2]){
                die = ctx.random.Die(G.player0Hand.length -1, num)
                console.log(die,'new die value')
            }
            await discard1Helper(G,num,die)
        }
    }
}


function discard1Helper(G,num,die){
    die.sort()
    console.log(die,'sorted die')
    die.reverse()
    console.log(die,'reversed die')
    for(let i = 0; i < num; i++){
        console.log(i,'this is i for player1', die, 'this is the die value')
        if(G.player0Hand[0] != null){
            G.player0Graveyard.push(G.player0Hand[die[i]])
            G.player0Hand.splice(die[i],1)
        }
    }
}

function discard0Helper(G,num,die){
    die.sort()
    console.log(die,'sorted die')
    die.reverse()
    console.log(die,'reversed die')
    for(let i = 0; i < num; i++){
        console.log(i,'this is i for player0',die, 'this is the die value')
        if(G.player1Hand[0] != null){
            G.player1Graveyard.push(G.player1Hand[die[i]])

            G.player1Hand.splice(die[i],1)
        }
    }
}
//wheat,meat,wood,stone,metal,gold length = 6
function player1AddGold(G,ctx,amount=1){
    G.player1Gold += amount
} 

function player0AddGold(G,ctx,amount=1){
    G.player0Gold += amount
}

function addArmor(G,ctx,amount=1){
    let player = ctx.currentPlayer
    if(player == 0){
        G.player0Armor += amount
    }
    if(player == 1){
        G.player1Armor += amount
    }
}

function increasePlayerPower(G,ctx,amount=1){ // this will double attacks dmg if on default. If you want to go above the default amount then remember to subtract by one for the correct value. ie: you want to triple attack power... set amount to 2.
    let player = ctx.currentPlayer
    if(player == 0){
        G.player0AttackMultiplyer += amount
    }
    if(player == 1){
        G.player1AttackMultiplyer += amount
    }
}

function increasePlayerAttackAdd(G,ctx,amount=1){ // this will double attacks dmg if on default. If you want to go above the default amount then remember to subtract by one for the correct value. ie: you want to triple attack power... set amount to 2.
    let player = ctx.currentPlayer
    if(player == 0){
        G.player0AttackAdd += amount
    }
    if(player == 1){
        G.player1AttackAdd += amount
    }
}


function increasePlayerHeals(G,ctx,amount=1){ //same deal as the dmg func.
    let player = ctx.currentPlayer
    if(player == 0){
        G.player0HealStr += amount
    }
    if(player == 1){
        G.player1HealStr += amount
    }
}



function powerShift(G,ctx){
    let player = ctx.currentPlayer
    if(player== 0){
        let l = G.player0Hand.length
        G.player1LifeTotal = G.player1LifeTotal - (l * G.player0AttackMultiplyer)
    }
    if(player == 1){
        let l = G.player0Hand.length
        G.player1LifeTotal = G.player1LifeTotal - (l * G.player0AttackMultiplyer)
    }
    
    G.player0Graveyard.push(...G.player0Hand)
    G.player1Graveyard.push(...G.player1Hand)
    G.player0Hand = []
    G.player1Hand = []
}

// {name: 'power gauntlet',decs:'attacks deal 1 extra dmg',key: 'relic-1',owner:'0'}
// {name: 'power shield',decs:'start each round with one point of armor',key: 'relic-2',owner:'1'}

function CheckRelics(G,ctx,card=undefined){
    
    if(G.player0Relics.length > 0){
        if(card){
            for(let i=0; i < G.player0Relics.length; i++){
                if(card.key === 'relic-1'|| card.key === 'relic-3'){
                    G.player0AttackAdd += (1)
                    i = G.player0Relics.length
                }
                if(card.key === 'relic-2'){
                    G.permArmor0 += (1)
                    i = G.player0Relics.length
                }
            }
        }else
        for(let i =0; i < G.player0Relics.length; i++){
            if(G.player0Relics[i].key === 'relic-1'|| card.key === 'relic-3'){
                G.player0AttackAdd += (1)
            }
            if(G.player0Relics[i].key === 'relic-2'){
                G.permArmor0 += (1)
            }
        }
    }
    if(G.player1Relics.length > 0){
        if(card){
            for(let i=0; i < G.player1Relics.length; i++){
                if(card.key === 'relic-1'|| card.key === 'relic-3'){
                    G.player1AttackAdd += (1)
                    i = G.player1Relics.length
                }
                if(card.key === 'relic-2' ){
                    G.permArmor1 += (1)
                    i = G.player1Relics.length
                }
            }
        }else
        for(let i =0; i < G.player1Relics.length; i++){
            if(G.player1Relics[i].key === 'relic-1'|| card.key === 'relic-3'){
                G.player1AttackAdd += (1)
            }
            if(G.player1Relics[i].key === 'relic-2'){
                G.permArmor1 += (1)
            }
        }
    }
}

function EndTurn(G,ctx){
    // console.log(ctx.stage)

    console.log(ctx.numMoves)

    if(ctx.numMoves == 0){
        ctx.events.setPhase('normal');
    } else if(ctx.numMoves == 1){
        ctx.events.setPhase('normal')
        // ctx.events.setPhase('normal')
    } else if(ctx.numMoves == 2){
        ctx.events.setPhase('normal')
        ctx.events.setPhase('normal')
    }
    G.firstPlay = 0
    ctx.events.setActivePlayers({all: 'draw'})
    

}