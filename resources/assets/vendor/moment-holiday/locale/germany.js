//! moment-holiday.js locale configuration
//! locale : Germany
//! author : Kodie Grantham : https://github.com/kodie
/*! regions :
      BB : Brandenburg
      BW : Baden-Württemberg
      BY : Bayern
      HE : Hessen
      MV : Mecklenburg-Vorpommern
      NW : Nordrhein-Westfalen
      RP : Rheinland-Pfalz
      SN : Sachsen
      SL : Saarland
      ST : Sachsen-Anhalt
      TH : Thüringen
*/

(function() {
  var moment = (typeof require === "function") ? require("moment") : this.moment;

  moment.holidays.germany = {
    "Neujahrstag": {
      date: '1/1',
      keywords: ['neujahrstag', 'new', 'year']
    },
    "Karfreitag": {
      date: 'goodfriday',
      keywords: ['karfreitag', 'good', 'friday']
    },
    "Ostersonntag": {
      date: 'easter',
      keywords: ['ostersonntag', 'easter'],
      keywords_n: ['monday'],
      regions: ['bb']
    },
    "Ostermontag": {
      date: 'eastermonday',
      keywords: ['ostermontag', 'easter', 'monday']
    },
    "Heilige Drei Könige": {
      date: '1/6',
      keywords: ['heilige', 'drei', 'könige', 'konige'],
      regions: ['bw', 'by', 'st']
    },
    "Maifeiertag": {
      date: '5/1',
      keywords: ['maifeiertag']
    },
    "Christi Himmelfahrt": {
      date: 'ascensionday',
      kaywords: ['christi', 'himmelfahrt', 'ascension']
    },
    "Pfingstsonntag": {
      date: 'pentecost',
      keywords: ['pfingstsonntag', 'pentecost'],
      regions: ['bb']
    },
    "Pfingstmontag": {
      date: 'whitmonday',
      keywords: ['pfingstmontag', 'whit', 'monday']
    },
    "Fronleichnam": {
      date: 'corpuschristi',
      keywords: ['fronleichnam', 'corpus', 'christi'],
      regions: ['bw', 'by', 'he', 'nw', 'rp', 'sl']
    },
    "Mariä Himmelfahrt": {
      date: '8/15',
      keywords: ['mariä', 'maria', 'himmelfahrt'],
      regions: ['sl']
    },
    "Tag der deutschen Einheit": {
      date: '10/3',
      keywords: ['deutschen', 'einheit']
    },
    "Reformationstag": {
      date: '10/31',
      keywords: ['reformationstag'],
      regions: ['bb', 'mv', 'sn', 'st', 'th']
    },
    "Allerheiligen": {
      date: '11/1',
      keywords: ['allerheiligen'],
      regions: ['bw', 'by', 'nw', 'rp', 'sl']
    },
    "Buß- und Bettag": {
      date: '11/(3,[17])',
      keywords: ['buß', 'bub', 'und', 'bettag'],
      regions: ['sn']
    },
    "Weihnachten": {
      date: '12/24',
      keywords: ['weihnachten', 'christmas']
    },
    "Zweiter Weihnachtsfeiertag": {
      date: '12/26',
      keywords: ['weihnachtsfeiertag'],
      keywords_y: ['zweiter']
    }
  };

  if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) { module.exports = moment; }
}).call(this);
