// ---- City selector ----
var selectedCityIndex = 0;
var CITIES = [
  {
    id: 'moscow', name: 'Moscow', subtitle: 'Moscow Marathon',
    sceneBoundaries: [0, 2, 8, 14, 20, 28, 34, 40, 42],
    sceneNames: ['Luzhniki Stadium', 'Old City Embankment', 'Kremlin Embankment', 'Moscow City', 'Ulitsa 1905 Goda', 'Kitay-Gorod', 'Embankment Return', 'Luzhniki Finish'],
    skyPalettes: [
      ['#2a1a30','#3d2545','#6b4070','#c08090'],
      ['#1a2a4e','#2a4a7f','#4a7abf','#7ab0df'],
      ['#16213e','#2a4a7f','#5b86c5','#8ab8e5'],
      ['#1565c0','#1e88e5','#42a5f5','#90caf9'],
      ['#1976d2','#2196f3','#64b5f6','#e3f2fd'],
      ['#1565c0','#2979b5','#5b9bd0','#b0c4de'],
      ['#2a1a30','#6b3050','#c06040','#e09050'],
      ['#3a1a20','#7a3030','#d06030','#f0a040'],
    ],
    sunPositions: [
      {x:100,y:250,r:25,show:false},{x:200,y:180,r:22,show:true},
      {x:350,y:100,r:22,show:true},{x:500,y:60,r:24,show:true},
      {x:600,y:50,r:26,show:true},{x:650,y:80,r:24,show:true},
      {x:720,y:180,r:30,show:true},{x:750,y:220,r:35,show:true},
    ],
    accentColor: '#e63946',
  },
  {
    id: 'berlin', name: 'Berlin', subtitle: 'Berlin Marathon',
    sceneBoundaries: [0, 7, 14, 21, 28, 35, 42],
    sceneNames: ['Brandenburg Gate Start', 'Tiergarten Park', 'Potsdamer Platz', 'East Side Gallery', 'Alexanderplatz', 'Reichstag Finish'],
    skyPalettes: [
      ['#1a2a4e','#2a4a7f','#4a7abf','#8ab8e5'],
      ['#16213e','#2a6a3f','#5baa65','#a0d8a0'],
      ['#1565c0','#1e88e5','#42a5f5','#90caf9'],
      ['#1976d2','#2196f3','#64b5f6','#e3f2fd'],
      ['#1565c0','#2979b5','#5b9bd0','#b0c4de'],
      ['#2a1a30','#6b3050','#c06040','#e09050'],
    ],
    sunPositions: [
      {x:150,y:160,r:22,show:true},{x:300,y:90,r:22,show:true},
      {x:450,y:55,r:24,show:true},{x:580,y:60,r:24,show:true},
      {x:660,y:100,r:26,show:true},{x:730,y:190,r:30,show:true},
    ],
    accentColor: '#f0c040',
  },
  {
    id: 'newyork', name: 'New York', subtitle: 'NYC Marathon',
    sceneBoundaries: [0, 7, 16, 22, 30, 37, 42],
    sceneNames: ['Verrazzano Bridge', 'Brooklyn', 'Queens', 'Bronx & Harlem', 'Central Park', 'Times Square Finish'],
    skyPalettes: [
      ['#1a2a4e','#2a4a7f','#5580b0','#90b8df'],
      ['#16213e','#2a4a7f','#5b86c5','#8ab8e5'],
      ['#1565c0','#1e88e5','#42a5f5','#90caf9'],
      ['#1976d2','#2196f3','#64b5f6','#e3f2fd'],
      ['#16213e','#2a6a3f','#5baa65','#a0d8a0'],
      ['#2a1a30','#5a2050','#a05060','#d08070'],
    ],
    sunPositions: [
      {x:180,y:150,r:22,show:true},{x:300,y:100,r:22,show:true},
      {x:450,y:55,r:24,show:true},{x:580,y:55,r:26,show:true},
      {x:660,y:90,r:24,show:true},{x:740,y:180,r:30,show:true},
    ],
    accentColor: '#1e88e5',
  },
  {
    id: 'london', name: 'London', subtitle: 'London Marathon',
    sceneBoundaries: [0, 7, 14, 21, 28, 35, 42],
    sceneNames: ['Greenwich', 'Tower Bridge', 'Canary Wharf', 'Thames Embankment', 'Westminster', 'Buckingham Palace'],
    skyPalettes: [
      ['#3a4a5a','#5a6a7a','#7a8a9a','#9aacbc'],
      ['#3a4a5a','#506070','#708090','#a0b0c0'],
      ['#2a3a4a','#4a5a6a','#6a7a8a','#8a9aaa'],
      ['#3a4a5a','#5a6a7a','#7a8a9a','#b0c0d0'],
      ['#3a4050','#5a5a6a','#7a7a8a','#a0a0b0'],
      ['#4a4050','#6a5060','#9a7070','#c0a090'],
    ],
    sunPositions: [
      {x:200,y:200,r:30,show:true},{x:300,y:160,r:28,show:true},
      {x:400,y:140,r:26,show:false},{x:500,y:120,r:28,show:true},
      {x:600,y:160,r:30,show:true},{x:700,y:200,r:32,show:true},
    ],
    accentColor: '#c0392b',
  },
  {
    id: 'boston', name: 'Boston', subtitle: 'Boston Marathon',
    sceneBoundaries: [0, 7, 16, 22, 30, 37, 42],
    sceneNames: ['Hopkinton Start', 'Ashland & Framingham', 'Wellesley College', 'Newton / Heartbreak Hill', 'Brookline', 'Boylston Street Finish'],
    skyPalettes: [
      ['#1a2a4e','#2a5a5f','#4a9a7f','#8ad0a0'],
      ['#16213e','#2a4a7f','#5b86c5','#8ab8e5'],
      ['#1565c0','#1e88e5','#42a5f5','#90caf9'],
      ['#1976d2','#2196f3','#64b5f6','#e3f2fd'],
      ['#1565c0','#2979b5','#5b9bd0','#b0c4de'],
      ['#2a2a30','#5a4050','#a06060','#d09070'],
    ],
    sunPositions: [
      {x:150,y:170,r:22,show:true},{x:280,y:100,r:22,show:true},
      {x:420,y:55,r:24,show:true},{x:550,y:50,r:26,show:true},
      {x:660,y:80,r:24,show:true},{x:740,y:170,r:30,show:true},
    ],
    accentColor: '#f0c040',
  },
  {
    id: 'singapore', name: 'Singapore', subtitle: 'Singapore Marathon',
    sceneBoundaries: [0, 7, 14, 21, 28, 35, 42],
    sceneNames: ['Padang Colonial District', 'Marina Bay', 'Gardens by the Bay', 'East Coast Park', 'Chinatown', 'Marina Bay Sands Finish'],
    skyPalettes: [
      ['#0a1628','#1a2a48','#3a5a88','#6a90c0'],
      ['#1a2a4e','#2a4a7f','#4a7abf','#7ab0df'],
      ['#0a3a2a','#1a5a4a','#3a8a6a','#6ac0a0'],
      ['#1565c0','#1e88e5','#42a5f5','#90caf9'],
      ['#3a1a20','#6a3030','#b05040','#e08060'],
      ['#1a0a28','#3a1a48','#6a3a78','#a060a0'],
    ],
    sunPositions: [
      {x:180,y:180,r:28,show:true},{x:350,y:80,r:26,show:true},
      {x:500,y:55,r:28,show:true},{x:600,y:60,r:26,show:true},
      {x:700,y:150,r:30,show:true},{x:750,y:210,r:35,show:true},
    ],
    accentColor: '#e63946',
  },
];

function getCity() { return CITIES[selectedCityIndex]; }
