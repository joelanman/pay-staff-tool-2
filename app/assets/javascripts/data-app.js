;(function($, window) {
  var $table;
  
  function init_nunjucks() {
    nunjucks.configure('/public/templates');
  }

  function init_app() {
    init_nunjucks();
    // have to make this available to the google-sheets-helpers
    window.listMajors = listMajors;
    $.getScript("https://apis.google.com/js/client.js?onload=checkAuth");
  }

  function formatDate( date ) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var mins = ('0' + date.getMinutes()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    // 2 Jul 2016 – 12:45
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " - " + hours + ":" + mins;
  }

  /**
   * Map all the cells from a row in the spreadsheet
   * into a data object that the templates can use
   */
  function mapRowToObject(row, rowNo) {
    var obj = {
      "row": rowNo,
      "reference": row[0],
      "firstName": row[1],
      "lastName": row[2],
      "email": row[3],
      "amount": row[4],
      "status": row[5],
      "subStatus": row[6],
      "card": row[7],
      "provider": row[8],
      "gatewayId": row[9],
      "payId": row[10],
      "startDate": formatDate(new Date ( Date.parse(row[11]) ) ),
      "startEnter": formatDate(new Date ( Date.parse(row[12]) ) ),
      "authSubmit": formatDate(new Date ( Date.parse(row[13]) ) ),
      "authSucceed": formatDate(new Date ( Date.parse(row[14]) ) ),
      "paySubmit": formatDate(new Date ( Date.parse(row[15]) ) ),
      "paySucceed": formatDate(new Date ( Date.parse(row[16]) ) ),
      "failed": formatDate(new Date ( Date.parse(row[17]) ) )
    };
    return obj;
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KThLEWTiXyl4j7AueDXq3FOKr_rkoZ57Db6kKChe0LA',
      range: 'Dataset0.1!A2:R101',
    }).then(function(response) {
      $("body").addClass("gs-data-loaded");
      var range = response.result;
      if (range.values.length > 0) {

        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          var item = mapRowToObject(row, i+1);

          // call render function
          appendPre(item);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    console.log('append');
    
    //console.log( document.getElementById('nj-list-item-template').innerHTML );
    //var iTemplate = nunjucks.compile( document.getElementById('nj-list-item-template').innerHTML );
    //console.log(document.getElementById('nj-list-item-template').innerHTML);
    //console.log(iTemplate.render(message));
    $table.append( jQuery.parseHTML( nunjucks.render('list-item.html', message) ) );
  }

  function navigateTo(evt) {
    window.document.location = $(this).data("href");
  }

  $(function() {
    // on dom ready, kick it all off
    $table = $('#transaction-table').find("tbody");
    init_app();

    $("#transaction-table").on('click', '.clickable-row', navigateTo);
  });

}).call(this, jQuery, window);