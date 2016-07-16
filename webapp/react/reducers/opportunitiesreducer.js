import { GET_OPPORTUNITIES, GET_OPPORTUNITY, GET_COMPANY } from '../actions/actiontypes';

const dummyOpps = [
  {
    name: 'Accessories of all descriptions for coffee are required by expert coffee distributor',
    desc: "<p>Coffee and tea are a large part of Czech culture. One of the country's coffee and tea distributors is looking for coffee drinking accessories from the United Kingdom.</p>" +
          "<p>The accessories should make the coffee drinking experience more convenient and more enjoyable. Innovative contraptions and everyday necessities are welcome. Attractive products, giving a certain zest to the coffee drinking and production process will be well received, but also those of a bland and practical nature.</p>" +
          "<p>The distributor welcomes all ideas and is keen to see what the UK can offer in this area.</p>" +
          "<p>For more information register below</p>"
  },
  {
    name: 'A Polish wholesaler is looking for British suppliers of building equipment, tools and accessories',
    desc: "The company associates wholesalers and distributors across the country and is an expert in traditional trade. It specializes in building sector and offers a few thousands of building products, such as building chemicals, materials, tools and DIY goods. The scope of products is very wide, from low-cost goods available on a mass scale to high end products. They are looking for long-term cooperation and want to be an exclusive distributor for a British supplier of chemicals, tools, accessories and other equipment used in building sector."
  },
  {
    name: 'Invitation for bids for construction works on a hospital',
    desc: "The Government of Lebanon represented by the Council for Development and Reconstruction (CDR) invites sealed bids from eligible Bidders for the construction and completion of the following works:</p>" +
          "<p>Tyre Governmental Hospital - South Lebanon. " +
          "The time allocated for the total completion of the project shall be 24 months." +
          "The extend of the works shall include but not limited to:</p>" +
          "<ul><li>Architectural works</li>" +
          "<li>Structural works</li>" +
          "<li>Electrical works - Low and extra low voltage</li>" +
          "<li>Mechanical works- Drainage water supply, fire fighting, irrigation and medical gazes</li>" +
          "<li>Heating, ventilation and air conditioning: piping and ducting</li>" +
          "<p>Bidders may contact UKTI team in Lebanon below to have further information about the project."
  }
];


export default function(state = { all: [], currentOpportunity:null, dummyOpps: dummyOpps }, action) {

  switch (action.type) {
    case GET_OPPORTUNITIES:
      return {...state, all: action.payload};
    case GET_OPPORTUNITY:
      return {...state, currentOpportunity: action.payload};
  }

  return state;
}
