/* Unit Testin!!!!! */
var body = document.getElementsByTagName("body")[0];
window.addEventListener('load',()=>console.log('It does'));
window.addEventListener('resize',()=>console.log("resizing"));
var deck = new Deck();
var player = new Player();
var war = new WarGame(5);

describe("deck.createCards().length", ()=>{
  it("Should return an array with a length of 52", () =>{
    expect(deck.createCards().length).toEqual(52);
  });
});

describe("war.players.length", ()=>{
  it("Should return an array with a length of 5", () =>{
    expect(war.players.length).toEqual(5);
  });
});
