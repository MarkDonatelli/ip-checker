export const helpersMixin = {
  data() {
    return {
      url: `https://wookie.codesubmit.io/ipcheck?ip=`,
      headers: {
        Authorization: 'Bearer WookieIP2022',
        'Content-Type': 'application/json'
      }
    };
  },
  methods: {
    setMap() {
      this.$store.state.map = L.map('map').setView(
        [this.$store.state.lat, this.$store.state.long],
        9
      );
      L.marker([this.$store.state.lat, this.$store.state.long]).addTo(
        this.$store.state.map
      );
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFya2RvbmF0ZWxsaSIsImEiOiJjbTV6dGN6cHUwNmFxMmxxMDU2bm9qYjZmIn0.Ph5vwBssV0P1CeyoXfq1CQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            'pk.eyJ1IjoibWFya2RvbmF0ZWxsaSIsImEiOiJjbTV6dGN6cHUwNmFxMmxxMDU2bm9qYjZmIn0.Ph5vwBssV0P1CeyoXfq1CQ'
        }
      ).addTo(this.$store.state.map);
    },
    stateNameToAbbreviation(name) {
      let states = {
        arizona: 'AZ',
        alabama: 'AL',
        alaska: 'AK',
        arkansas: 'AR',
        california: 'CA',
        colorado: 'CO',
        connecticut: 'CT',
        'district of columbia': 'DC',
        delaware: 'DE',
        florida: 'FL',
        georgia: 'GA',
        hawaii: 'HI',
        idaho: 'ID',
        illinois: 'IL',
        indiana: 'IN',
        iowa: 'IA',
        kansas: 'KS',
        kentucky: 'KY',
        louisiana: 'LA',
        maine: 'ME',
        maryland: 'MD',
        massachusetts: 'MA',
        michigan: 'MI',
        minnesota: 'MN',
        mississippi: 'MS',
        missouri: 'MO',
        montana: 'MT',
        nebraska: 'NE',
        nevada: 'NV',
        'new hampshire': 'NH',
        'new jersey': 'NJ',
        'new mexico': 'NM',
        'new york': 'NY',
        'north carolina': 'NC',
        'north dakota': 'ND',
        ohio: 'OH',
        oklahoma: 'OK',
        oregon: 'OR',
        pennsylvania: 'PA',
        'rhode island': 'RI',
        'south carolina': 'SC',
        'south dakota': 'SD',
        tennessee: 'TN',
        texas: 'TX',
        utah: 'UT',
        vermont: 'VT',
        virginia: 'VA',
        washington: 'WA',
        'west virginia': 'WV',
        wisconsin: 'WI',
        wyoming: 'WY',
        'american samoa': 'AS',
        guam: 'GU',
        'northern mariana islands': 'MP',
        'puerto rico': 'PR',
        'us virgin islands': 'VI',
        'us minor outlying islands': 'UM'
      };

      let abbr = name
        .trim()
        .replace(/[^\w ]/g, '')
        .toLowerCase();
      if (states[abbr] !== null) {
        return states[abbr];
      }

      return null;
    }
  }
};
