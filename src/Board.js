import React from 'react';

export class MacroTacticsBoard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { player0DeckToggled: false, cardDescToggle: false, cardDesc: '' }

    this.showPlayer0Deck = this.showPlayer0Deck.bind(this)
  }

  buyCard(card) {
    let owner = this.props.ctx.currentPlayer
    card.owner = owner
    this.props.moves.BuyCard(card)
  }

  checkCard(card){
    console.log(card)
    this.setState({cardDescToggle: !this.state.cardDescToggle, cardDesc: card.desc})
  }

  whenClicked(id, owner) {
    console.log(owner)
    if (owner != this.props.ctx.currentPlayer) {
      this.props.moves.InvalidMove()
    } else
      this.props.moves.PlayCard(id);
  }

  endTurn(id){
    this.props.moves.EndTurn()
  }



  handleDraw(player) {
    console.log(player, 'this is the player trying to draw')

    if (player != this.props.ctx.currentPlayer) {
      console.log('error: wrong player drawstep')
      this.props.moves.InvalidMove()
      return
    }
    if (player === 0) {
      this.props.moves.Player0DrawCard(1)
    }
    if (player === 1) {
      this.props.moves.Player1DrawCard(1)
    }

    else {
      console.log('error: general')
      this.props.moves.InvalidMove()
      return
    }

  }

  showPlayer0Deck() {
    this.setState({ player0DeckToggled: !this.state.player0DeckToggled })
    console.log(this.state.player0DeckToggled)
  }



  render() {


    const cellStyle = {
      border: '1px solid #555',
      width: '110px',
      height: '150px',
      lineHeight: '50px',
      textAlign: 'center',
    };


    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: Player {this.props.ctx.gameover.winner}</div>
        ) : (
            <div id="winner">Draw!</div>
          );
    }


    let deckList = [];
    if (this.state.player0DeckToggled) {
      deckList =
        <div id='decklist'>{this.props.G.player0Deck.map((elm) => {

          return (
            <div key={elm.key} style={cellStyle} onClick={null}>
              <p>
                {elm.name}
                <br></br>
                {elm.desc}
              </p>
            </div>
          )

        })}</div>
    }
    let cardArray = []
    if(this.state.cardDescToggle){
      cardArray =
      <div className='descCard'>{this.state.cardDesc}
      <button onClick={() => this.setState({cardDescToggle: !this.state.cardDescToggle})}>X</button>

      </div>
    }



    // let tbody = [];
    // for (let i = 0; i < 10; i++) {
    //   let cells = [];
    //   for (let j = 0; j < 10; j++) {
    //     const id = 10 * i + j;
    //     cells.push(
    //       <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
    //         {this.props.G.cells[id]}
    //       </td>
    //     );
    //   }
    //   tbody.push(<tr key={i}>{cells}</tr>);
    // }

    console.log(this.state.cardDescToggle)
    return (
      <div>
        <table id="board">
          {/* <tbody>{tbody}</tbody> */}
        </table>
        {/* <div style={cellStyle}>{this.props.G.player0Deck[0].name}</div> */}
        <div className='player1Hand'>
          <div>player1 hand</div>
          <button onClick={() => this.handleDraw(1)}>draw</button>
          {
            this.props.G.player1Hand.map((elem) => {
              return (
                <div key={elem.key} style={cellStyle} onClick={() => this.whenClicked(elem.key, elem.owner)}>
                  <p>
                    {elem.name}
                    <br></br>
                    {elem.desc}
                  </p>
                </div>)
            })
          }
        </div>
        <div className="player1Graveyard">
          <div>Player1 Graveyard</div>
          {this.props.G.player1Graveyard.map((elem) => {
            return (
              <div key={elem.key} style={cellStyle} onClick={null}>
                <p>
                  {elem.name}
                  <br></br>
                  {elem.desc}
                </p>
              </div>
            )
          })}
        </div>

        

        <div className='player1LifeTotal'>
          Player1 Gold Total:
      <br></br>
          <h2>{this.props.G.player1Gold}</h2>
        </div>

        <div className='player1LifeTotal'>
          Player1 Attack Multiplier:
      <br></br>
          <h2>{this.props.G.player1AttackMultiplyer}</h2>
        </div>

        <div className='player1LifeTotal'>
          Player1 life/life total/armor:
      <br></br>
          <h2>{this.props.G.player1LifeTotal}/{this.props.G.player1LifeMax}/{this.props.G.player1Armor}</h2>
        </div>

        <div className='player1LifeTotal'>
          Moves Left:
      <br></br>
          <h2>{this.props.ctx.numMoves}/3</h2>
        </div>

        <div className='player0LifeTotal'>
          Player0 life/life total/armor:
      <br></br>
          <h2>{this.props.G.player0LifeTotal}/{this.props.G.player0LifeMax}/{this.props.G.player0Armor}</h2>
        </div>
        <div className='player0LifeTotal'>
          Player0 Attack Multiplier:
      <br></br>
          <h2>{this.props.G.player0AttackMultiplyer}</h2>
        </div>
        <div className='player0LifeTotal'>
          Player0 Gold Total:
      <br></br>
          <h2>{this.props.G.player0Gold}</h2>
        </div>



        <div className='player0Hand'>
          <div>player0 hand</div>
          <button onClick={() => this.handleDraw(0)}>draw</button>
          {
            this.props.G.player0Hand.map((elem) => {

              return (
                <div key={elem.key} style={cellStyle} onClick={() => this.whenClicked(elem.key, elem.owner)}>
                  <p>
                    {elem.name}
                    <br></br>
                    {elem.desc}
                  </p>
                </div>)
            })
          }
        </div>
        
        <div className='end-turn'>
          <button onClick={() => { this.endTurn() }}>End Turn</button>

        </div>
        

        <div className='player0Deck'>
          <div>player0 deck</div>
          <div style={cellStyle} onClick={() => { this.showPlayer0Deck(0) }}>
            {
              this.props.G.player0Deck[0].name
            }
          </div>

        </div>



        <div className="player0Graveyard">
          <div>Player0 Graveyard</div>
          {this.props.G.player0Graveyard.map((elem) => {
            return (
              <div key={elem.key} style={cellStyle} onClick={null}>
                <p>
                  {elem.name}
                  <br></br>
                  {elem.desc}
                </p>
              </div>
            )
          })}
        </div>

        <div className="player0Relics">
          <div>Player0 Relics</div>
          {this.props.G.player0Relics.map((elem) => {
            return (
              <div key={elem.key} style={cellStyle} onClick={null}>
                <p>
                  {elem.name}
                  <br></br>
                  {elem.desc}
                </p>
              </div>
            )
          })}
        </div>
        <div className="player1Relics">
          <div>Player1 Relics</div>
          {this.props.G.player1Relics.map((elem) => {
            return (
              <div key={elem.key} style={cellStyle} onClick={null}>
                <p>
                  {elem.name}
                  <br></br>
                  {elem.desc}
                </p>
              </div>
            )
          })}
        </div>



        <div className='market'>
          <div>Market</div>
          {/* {this.props.G.marketDeck.map((elem)=> {
          return(
            <div key={elem.key} style={cellStyle} onClick={()=>{this.buyCard(elem)}}>
              <p>
                {elem.name}
                <br></br>
                {elem.desc}
              </p>
            </div>
          )
        })} */}



 {/* onClick={() => { this.buyCard(this.props.G.marketDeck[0]) }} */}
          <div key={this.props.G.marketDeck[0].key} style={cellStyle}>
            <div onClick={() => { this.buyCard(this.props.G.marketDeck[0]) }}>
            <p>
              <div className='market-info'>Cost:{this.props.G.marketDeck[0].cost}</div>
              <div className='market-info'>{this.props.G.marketDeck[0].name}</div>
              <br></br>
            </p>
            </div>
            <div onClick={() =>{this.checkCard(this.props.G.marketDeck[0])}}>Info</div>
          </div>

          <div key={this.props.G.marketDeck[1].key} style={cellStyle}>
          <div onClick={() => { this.buyCard(this.props.G.marketDeck[1]) }}>
            <p>
              <div className='market-info'>Cost:{this.props.G.marketDeck[1].cost}</div>
              <div className='market-info'>{this.props.G.marketDeck[1].name}</div>
              <br></br>
            </p>
            </div>
            <div onClick={() =>{this.checkCard(this.props.G.marketDeck[1])}}>Info</div>
          </div>

          <div key={this.props.G.marketDeck[2].key} style={cellStyle}>
          <div onClick={() => { this.buyCard(this.props.G.marketDeck[2]) }}>
            <p>
              <div className='market-info'>Cost:{this.props.G.marketDeck[2].cost}</div>
              <div className='market-info'>{this.props.G.marketDeck[2].name}</div>
              <br></br>
            </p>
            </div>
            <div onClick={() =>{this.checkCard(this.props.G.marketDeck[2])}}>Info</div>
          </div>

        </div>
        <div>{cardArray}</div>
        <h3>{deckList}</h3>
        <h3>
          {winner}
        </h3>
      </div>
    );
  }
}