import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import GameCard from './GameCard'

//set up an axios call to grab the cards from the backend and populate the deck data here.


const Deck = (props) => {

    //card list will be populated by an axios call

    //card cost [(meat), (copper), (wood), (gold)]

    let {id} = useParams();

    const [cardList, setCardList] = useState([{
        cardImg: 'https://b3h2.scene7.com/is/image/BedBathandBeyond/324468869189531p?$imagePLP$&wid=256&hei=256',
        cardText: 'Usually mined by the lower mountain peoples, its uses are inumerable',
        cardTitle: 'Metal',
        cardType: 'Resource',
        cardCost: '0'
    },
    {
        cardImg: 'data:image/jpeg;base64,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',
        cardText: 'Cut by expert wood cutters by the base of the mountains.',
        cardTitle: 'Wood',
        cardType: 'Resource',
        cardCost: '0'
    },
    {
        cardImg: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/cut-of-meat.png',
        cardText: 'Back on the menu, boiz',
        cardTitle: 'Meat',
        cardType: 'Resource',
        cardCost: '0'
    },
    {
        cardImg: 'https://pm1.narvii.com/7360/950eddd4f2c7e1ef000a6a19002ed3b21c0f8f0dr1-256-256v2_00.jpg',
        cardText: 'Poor in more ways than one',
        cardTitle: 'Goblin Peon',
        cardType: 'Gobin - Creature',
        cardCost: '1M'
    },
    {
        cardImg: 'https://i.pinimg.com/originals/8e/b6/2a/8eb62a42573baa58e9c865ae64aa5929.png',
        cardText: 'The fists of the Chief',
        cardTitle: 'Goblin Warrior',
        cardType: 'Goblin - Warrior',
        cardCost: '1M 2C'
    },
        ])

    //deckdata will also be in an axios call

    const [deckData, setDeckData] =useState({

        //this is an example of the deck data.
        cardList: cardList,
        deckType: ['wood','copper','meat'],
        cardInDeck: 40

    })

    console.log(id)
// Todo build a backend that holds the information for the differents decks based of the parameters given in the url do an axios call and map out the deck.
    if(id === 'Goblins'){   
        return(
    
            <div>
                
                
                {cardList.map((card)=>{
                    return(
                        <GameCard key={card.cardTitle} value={card}></GameCard>
                    )
                })}
    
            </div>
        )
    } else return (<div>
        deck failed to show up. id === {id}
    </div>)
}

export default Deck