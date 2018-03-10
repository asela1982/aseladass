  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'BS in Physical Sciences',start: '2003-08-01', end: '2006-08-01', style:"color:white;background-color: #303B60;border:0px"},
    {id: 2, content: 'Advanced Diploma in Mgt. Accountancy(CIMA)',start: '2003-08-01', end: '2006-08-01', style:"color:white;background-color: #303B60;border:0px"},
    {id: 3, content: 'MBA in Int.Finance', start: '2010-08-01', end: '2012-05-01',style:"color:white;background-color: #303B60;border:0px"},
    {id: 4, content: 'UT Data Analytics & Visualization', start: '2017-10-03',style:"color:white;background-color: #303B60;border:0px"},
    {id: 5, content: 'Employee of the Year(Nominated)', start: '2014-03-01',style:"color:white;background-color: #2962FF;border:0px"},
    {id: 6, content: 'Manager Data Analytics(M2), Nations Trust Bank', start: '2015-01-01', end: '2017-07-01',style:"color:white;background-color: #20A5C0;border:0px"},
    {id: 7, content: 'Consumer Loans Manager(M1), Nations Trust Bank', start: '2012-05-01', end: '2014-12-31',style:"color:white;background-color: #20A5C0;border:0px"},
    {id: 8, content: 'Sub officer, Consumer Credit, Standard Chartered Bank', start: '2006-08-01', end: '2008-07-30',style:"color:white;background-color: #20A5C0;border:0px"},
    {id: 9, content: 'Officer, Consumer Credit, Standard Chartered Bank', start: '2008-08-01', end: '2010-07-30',style:"color:white;background-color: #20A5C0;border:0px"},
    {id: 10, content: 'John Molson MBA Case Competition', start: '2011-01-01',style:"color:white;background-color: #303B60;border:0px"},
    {id: 11, content: 'Tableau Conference on Tour', start: '2016-01-01',style:"color:white;background-color: #303B60;border:0px"},
    {id: 12, content: 'SciPy Conference, Austin, Texas', start: '2017-07-10',style:"color:white;background-color: #303B60;border:0px"}
  ]);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);