var model = require("../../domain/model");
var stats = require("../../routes/stats");

describe("stats.js", function() {
    it("Should retrive stats for single player over given matches", function(done) {
        
        var result = stats.calculate(MATCHES);
        // console.log(result);
        expect(result).toBeDefined();
        expect(result.byPlayer).toBeDefined();
        expect(result.byPlayer.length).toBe(13);
        expect(result.playersMap.Lauta.points).toBe(7);
        expect(result.playersMap.Lauta.win).toBe(2);
        expect(result.playersMap.Lauta.lost).toBe(4);
        expect(result.playersMap.Lauta.even).toBe(1);
        expect(result.playersMap.Lauta.count).toBe(7);
        expect(result.playersMap.Lauta.beers).toBe(35.769999999999996);
        expect(result.playersMap.Lauta.beersCount).toBe(5);
        expect(result.playersMap.Lauta.goals).toBe(5);
        expect(result.playersMap.Lauta.goalsCount).toBe(1);
        expect(result.playersMap.Lauta.podium1).toBe(2);
        expect(result.playersMap.Lauta.podium2).toBe(0);
        expect(result.playersMap.Lauta.podium3).toBe(0);
        expect(result.playersMap.Lauta.beerAvg).toBe(7.153999999999999);
        
        
        expect(result.playersMap.RAta.points).toBe(19);
        

        done();
    });

    it("Should retrive stats for single player over one match", function(done) {

        var map = stats.calculateMatch(MATCHES[7]);
        var result = {
            byPlayer: []
        };
        for ( var k in map.playersMap ) {
            result.byPlayer.push(map.playersMap[k]);
        }

        expect(result).toBeDefined();
        expect(result.byPlayer).toBeDefined();
        expect(result.byPlayer.length).toBe(10);
        expect(result.byPlayer[9]).toEqual({ 
            player: 'Lauta',
            count: 1,
            win: 1,
            lost: 0,
            even: 0,
            points: 3,
            goalsCount: 1,
            goals: 5,
            beersCount: 1,
            beers: 8.22,
            beerAvg: 0,
            podium1: 1,
            podium2: 0,
            podium3: 0 
        });

        done();
    });


    var MATCHES = [{
        "_id": "2009_1",
        "date": "2009-03-23T17:56:35.536Z",
        "league": "2009",
        "round": 1,
        "winner": "B",
        "podium": [],
        "teamB": {
          "otherGoals": 1,
          "goals": 1,
          "members": [
            {
              "player": "RAta",
              "_id": "53172b0979eae80200000004"
            },
            {
              "player": "Colo",
              "_id": "5318257aa2cb9a0200000009"
            },
            {
              "player": "Seba",
              "_id": "5318257aa2cb9a0200000008"
            },
            {
              "player": "Hanga",
              "_id": "5318257aa2cb9a0200000007"
            },
            {
              "player": "Nico",
              "_id": "5318257aa2cb9a0200000006"
            }
          ]
        },
        "team1": {
          "otherGoals": 0,
          "goals": 0,
          "members": [
            {
              "player": "Lauta",
              "_id": "53172b0979eae80200000003"
            },
            {
              "player": "Ari",
              "_id": "5318257aa2cb9a0200000005"
            },
            {
              "player": "Claudio",
              "_id": "5318257aa2cb9a0200000004"
            },
            {
              "player": "Leo",
              "_id": "5318257aa2cb9a0200000003"
            },
            {
              "player": "Iraky",
              "_id": "5318332c2ba76c0200000003"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Colo",
          "Leo",
          "Seba",
          "Claudio",
          "Hanga",
          "Nico",
          "Iraky"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_2",
        "date": "2009-03-30T07:35:10.432Z",
        "league": "2009",
        "round": 2,
        "winner": "B",
        "podium": [],
        "teamB": {
          "otherGoals": 3,
          "goals": 3,
          "members": [
            {
              "player": "Leo",
              "_id": "5318339b2ba76c0200000008"
            },
            {
              "player": "Hanga",
              "_id": "5318339b2ba76c0200000007"
            },
            {
              "player": "Nico",
              "_id": "5318339b2ba76c0200000006"
            },
            {
              "player": "Seba",
              "_id": "5318339b2ba76c0200000005"
            },
            {
              "player": "Ari",
              "_id": "5318339b2ba76c0200000004"
            }
          ]
        },
        "team1": {
          "otherGoals": 0,
          "goals": 0,
          "members": [
            {
              "player": "RAta",
              "_id": "5318339b2ba76c020000000d"
            },
            {
              "player": "Richo",
              "_id": "5318339b2ba76c020000000c"
            },
            {
              "player": "Colo",
              "_id": "5318339b2ba76c020000000b"
            },
            {
              "player": "Lauta",
              "_id": "5318339b2ba76c020000000a"
            },
            {
              "player": "Nicolachi",
              "_id": "5318339b2ba76c0200000009"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Colo",
          "Leo",
          "Seba",
          "Richo",
          "Hanga",
          "Nico",
          "Nicolachi"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_3",
        "date": "2009-04-06T07:37:12.271Z",
        "league": "2009",
        "round": 3,
        "winner": "B",
        "podium": [
          "Seba",
          "Hanga",
          "RAta"
        ],
        "teamB": {
          "avg": 8.184000000000001,
          "beers": 40.92,
          "otherGoals": 18,
          "goals": 18,
          "members": [
            {
              "player": "RAta",
              "beers": 8.27,
              "podium": 3,
              "_id": "5318347e2ba76c0200000012"
            },
            {
              "player": "Seba",
              "beers": 8.5,
              "podium": 1,
              "_id": "5318347e2ba76c0200000011"
            },
            {
              "player": "Nicolachi",
              "beers": 7.83,
              "podium": null,
              "_id": "5318347e2ba76c0200000010"
            },
            {
              "player": "Hanga",
              "beers": 8.44,
              "podium": 2,
              "_id": "5318347e2ba76c020000000f"
            },
            {
              "player": "Colo",
              "beers": 7.88,
              "podium": null,
              "_id": "5318347e2ba76c020000000e"
            }
          ]
        },
        "team1": {
          "avg": 5.234,
          "beers": 26.17,
          "otherGoals": 6,
          "goals": 6,
          "members": [
            {
              "player": "Claudio",
              "beers": 5.27,
              "podium": null,
              "_id": "5318347e2ba76c0200000017"
            },
            {
              "player": "Nico",
              "beers": 4.16,
              "podium": null,
              "_id": "5318347e2ba76c0200000016"
            },
            {
              "player": "Ari",
              "beers": 5.33,
              "podium": null,
              "_id": "5318347e2ba76c0200000015"
            },
            {
              "player": "Leo",
              "beers": 5.41,
              "podium": null,
              "_id": "5318347e2ba76c0200000014"
            },
            {
              "player": "Richo",
              "beers": 6,
              "podium": null,
              "_id": "5318347e2ba76c0200000013"
            }
          ]
        },
        "players": [
          "RAta",
          "Ari",
          "Colo",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico",
          "Nicolachi"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_4",
        "date": "2009-04-13T07:37:12.271Z",
        "league": "2009",
        "round": 4,
        "winner": "1",
        "podium": [
          "Tano",
          "Hanga",
          "Iraky"
        ],
        "teamB": {
          "avg": 7.383999999999999,
          "beers": 36.919999999999995,
          "otherGoals": 6,
          "goals": 6,
          "members": [
            {
              "player": "Seba",
              "_id": "5318461186efb30200000007",
              "beers": 7.27,
              "podium": null
            },
            {
              "player": "RAta",
              "_id": "5318461186efb30200000006",
              "beers": 7.27,
              "podium": null
            },
            {
              "player": "Colo",
              "_id": "5318461186efb30200000005",
              "beers": 7.22,
              "podium": null
            },
            {
              "player": "Nico",
              "_id": "5318461186efb30200000004",
              "beers": 7.33,
              "podium": null
            },
            {
              "player": "Iraky",
              "_id": "5318461186efb30200000003",
              "beers": 7.83,
              "podium": 3
            }
          ]
        },
        "team1": {
          "avg": 7.9959999999999996,
          "beers": 39.98,
          "otherGoals": 8,
          "goals": 8,
          "members": [
            {
              "player": "Claudio",
              "_id": "5318461186efb3020000000c",
              "beers": 7.77,
              "podium": null
            },
            {
              "player": "Hanga",
              "_id": "5318461186efb3020000000b",
              "beers": 8.16,
              "podium": 2
            },
            {
              "player": "Ari",
              "_id": "5318461186efb3020000000a",
              "beers": 7.72,
              "podium": null
            },
            {
              "player": "Richo",
              "_id": "5318461186efb30200000009",
              "beers": 7.22,
              "podium": null
            },
            {
              "player": "Tano",
              "_id": "5318461186efb30200000008",
              "beers": 9.11,
              "podium": 1
            }
          ]
        },
        "players": [
          "RAta",
          "Ari",
          "Colo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico",
          "Iraky",
          "Tano"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_5",
        "date": "2009-04-20T07:37:12.271Z",
        "league": "2009",
        "round": 5,
        "winner": "E",
        "podium": [
          "Hanga",
          "Richo",
          "Seba"
        ],
        "teamB": {
          "otherGoals": 8,
          "goals": 8,
          "avg": 7.518000000000001,
          "beers": 37.59,
          "members": [
            {
              "player": "Colo",
              "beers": 6.61,
              "podium": null,
              "_id": "531849a086efb30200000011"
            },
            {
              "player": "Lauta",
              "beers": 7.22,
              "podium": null,
              "_id": "531849a086efb30200000010"
            },
            {
              "player": "Hanga",
              "beers": 8.55,
              "podium": 1,
              "_id": "531849a086efb3020000000f"
            },
            {
              "player": "Richo",
              "beers": 7.66,
              "podium": 2,
              "_id": "531849a086efb3020000000e"
            },
            {
              "player": "Seba",
              "beers": 7.55,
              "podium": 3,
              "_id": "531849a086efb3020000000d"
            }
          ]
        },
        "team1": {
          "otherGoals": 8,
          "goals": 8,
          "avg": 6.638,
          "beers": 33.19,
          "members": [
            {
              "player": "RAta",
              "beers": 6.88,
              "podium": null,
              "_id": "531849a086efb30200000016"
            },
            {
              "player": "Leo",
              "beers": 6.77,
              "podium": null,
              "_id": "531849a086efb30200000015"
            },
            {
              "player": "Ari",
              "beers": 6.44,
              "podium": null,
              "_id": "531849a086efb30200000014"
            },
            {
              "player": "Claudio",
              "beers": 6.83,
              "podium": null,
              "_id": "531849a086efb30200000013"
            },
            {
              "player": "Nico",
              "beers": 6.27,
              "podium": null,
              "_id": "531849a086efb30200000012"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Colo",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_6",
        "date": "2009-04-27T07:37:12.271Z",
        "league": "2009",
        "round": 6,
        "winner": "1",
        "podium": [
          "Lauta",
          "Nicolachi",
          "Claudio"
        ],
        "teamB": {
          "avg": 6.593999999999999,
          "beers": 32.97,
          "otherGoals": 12,
          "goals": 12,
          "members": [
            {
              "player": "Seba",
              "beers": 6.66,
              "podium": null,
              "_id": "53184a6686efb3020000001b"
            },
            {
              "player": "Nico",
              "beers": 6.27,
              "podium": null,
              "_id": "53184a6686efb3020000001a"
            },
            {
              "player": "Hanga",
              "beers": 7.27,
              "podium": null,
              "_id": "53184a6686efb30200000019"
            },
            {
              "player": "Richo",
              "beers": 6.27,
              "podium": null,
              "_id": "53184a6686efb30200000018"
            },
            {
              "player": "Leo",
              "beers": 6.5,
              "podium": null,
              "_id": "53184a6686efb30200000017"
            }
          ]
        },
        "team1": {
          "avg": 7.730000000000001,
          "beers": 38.650000000000006,
          "otherGoals": 15,
          "goals": 15,
          "members": [
            {
              "player": "RAta",
              "beers": 7.5,
              "podium": null,
              "_id": "53184a6686efb30200000020"
            },
            {
              "player": "Nicolachi",
              "beers": 7.94,
              "podium": 2,
              "_id": "53184a6686efb3020000001f"
            },
            {
              "player": "Ari",
              "beers": 7.44,
              "podium": null,
              "_id": "53184a6686efb3020000001e"
            },
            {
              "player": "Claudio",
              "beers": 7.77,
              "podium": 3,
              "_id": "53184a6686efb3020000001d"
            },
            {
              "player": "Lauta",
              "beers": 8,
              "podium": 1,
              "_id": "53184a6686efb3020000001c"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico",
          "Nicolachi"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_7",
        "date": "2009-05-04T07:37:12.271Z",
        "league": "2009",
        "round": 7,
        "winner": "1",
        "podium": [
          "Richo",
          "RAta",
          "Hanga"
        ],
        "teamB": {
          "avg": 6.208,
          "beers": 31.04,
          "otherGoals": 7,
          "goals": 7,
          "members": [
            {
              "player": "Seba",
              "beers": 6.05,
              "podium": null,
              "_id": "53184ada86efb30200000025"
            },
            {
              "player": "Lauta",
              "beers": 6.61,
              "podium": null,
              "_id": "53184ada86efb30200000024"
            },
            {
              "player": "Claudio",
              "beers": 7,
              "podium": null,
              "_id": "53184ada86efb30200000023"
            },
            {
              "player": "Ari",
              "beers": 5.27,
              "podium": null,
              "_id": "53184ada86efb30200000022"
            },
            {
              "player": "Nicolachi",
              "beers": 6.11,
              "podium": null,
              "_id": "53184ada86efb30200000021"
            }
          ]
        },
        "team1": {
          "avg": 7.052,
          "beers": 35.26,
          "otherGoals": 9,
          "goals": 9,
          "members": [
            {
              "player": "RAta",
              "beers": 7.27,
              "podium": 2,
              "_id": "53184ada86efb3020000002a"
            },
            {
              "player": "Hanga",
              "beers": 7.22,
              "podium": 3,
              "_id": "53184ada86efb30200000029"
            },
            {
              "player": "Leo",
              "beers": 7.11,
              "podium": null,
              "_id": "53184ada86efb30200000028"
            },
            {
              "player": "Nico",
              "beers": 5.94,
              "podium": null,
              "_id": "53184ada86efb30200000027"
            },
            {
              "player": "Richo",
              "beers": 7.72,
              "podium": 1,
              "_id": "53184ada86efb30200000026"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico",
          "Nicolachi"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_8",
        "date": "2009-05-11T07:37:12.271Z",
        "league": "2009",
        "round": 8,
        "winner": "B",
        "podium": [
          "Lauta",
          "RAta",
          "Seba"
        ],
        "teamB": {
          "avg": 7.395999999999999,
          "beers": 36.98,
          "goals": 15,
          "otherGoals": 2,
          "members": [
            {
              "player": "Seba",
              "beers": 7.38,
              "podium": 3,
              "goals": 3,
              "_id": "53184b8786efb3020000002f"
            },
            {
              "player": "RAta",
              "beers": 7.44,
              "podium": 2,
              "goals": 3,
              "_id": "53184b8786efb3020000002e"
            },
            {
              "player": "Nicolachi",
              "beers": 7.11,
              "podium": null,
              "goals": 0,
              "_id": "53184b8786efb3020000002d"
            },
            {
              "player": "Nico",
              "beers": 6.83,
              "podium": null,
              "goals": 2,
              "_id": "53184b8786efb3020000002c"
            },
            {
              "player": "Lauta",
              "beers": 8.22,
              "podium": 1,
              "goals": 5,
              "_id": "53184b8786efb3020000002b"
            }
          ]
        },
        "team1": {
          "avg": 5.518,
          "beers": 27.59,
          "otherGoals": null,
          "goals": 10,
          "members": [
            {
              "player": "Hanga",
              "beers": 5.83,
              "podium": null,
              "goals": 2,
              "_id": "53184b8786efb30200000034"
            },
            {
              "player": "Claudio",
              "beers": 5.66,
              "podium": null,
              "goals": 2,
              "_id": "53184b8786efb30200000033"
            },
            {
              "player": "Leo",
              "beers": 5.44,
              "podium": null,
              "goals": 2,
              "_id": "53184b8786efb30200000032"
            },
            {
              "player": "Ari",
              "beers": 5.22,
              "podium": null,
              "goals": 1,
              "_id": "53184b8786efb30200000031"
            },
            {
              "player": "Richo",
              "beers": 5.44,
              "podium": null,
              "goals": 3,
              "_id": "53184b8786efb30200000030"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nico",
          "Nicolachi"
        ],
        "status": "PLANNING"
      },
      {
        "_id": "2009_9",
        "date": "2009-05-18T07:37:12.271Z",
        "league": "2009",
        "round": 9,
        "winner": "B",
        "podium": [
          "Seba",
          "RAta",
          "Leo"
        ],
        "teamB": {
          "avg": 7.75,
          "beers": 38.75,
          "otherGoals": 10,
          "goals": 10,
          "members": [
            {
              "player": "RAta",
              "beers": 8.05,
              "podium": 2,
              "_id": "53184e2286efb30200000039"
            },
            {
              "player": "Seba",
              "beers": 8.55,
              "podium": 1,
              "_id": "53184e2286efb30200000038"
            },
            {
              "player": "Leo",
              "beers": 7.77,
              "podium": 3,
              "_id": "53184e2286efb30200000037"
            },
            {
              "player": "Colo",
              "beers": 7.11,
              "podium": null,
              "_id": "53184e2286efb30200000036"
            },
            {
              "player": "Nicolachi",
              "beers": 7.27,
              "podium": null,
              "_id": "53184e2286efb30200000035"
            }
          ]
        },
        "team1": {
          "avg": 5.895999999999999,
          "beers": 29.479999999999997,
          "otherGoals": 6,
          "goals": 6,
          "members": [
            {
              "player": "Hanga",
              "beers": 5.55,
              "podium": null,
              "_id": "53184e2286efb3020000003e"
            },
            {
              "player": "Lauta",
              "beers": 5.72,
              "podium": null,
              "_id": "53184e2286efb3020000003d"
            },
            {
              "player": "Claudio",
              "beers": 5.77,
              "podium": null,
              "_id": "53184e2286efb3020000003c"
            },
            {
              "player": "Ari",
              "beers": 5.83,
              "podium": null,
              "_id": "53184e2286efb3020000003b"
            },
            {
              "player": "Richo",
              "beers": 6.61,
              "podium": null,
              "_id": "53184e2286efb3020000003a"
            }
          ]
        },
        "players": [
          "Lauta",
          "RAta",
          "Ari",
          "Colo",
          "Leo",
          "Seba",
          "Richo",
          "Claudio",
          "Hanga",
          "Nicolachi"
        ],
        "status": "PLANNING"
      }
    ]
});