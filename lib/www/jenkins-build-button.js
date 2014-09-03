var conf = {
    job : 'example',
    host: 'http://alembic.local:7000'
};

var formatScriptTag = function(src){
    $.ajax({
        url: src,
        dataType: "jsonp"
    });
};

var pollRemoteHost = function (){
    $.getJSON(conf.host +
              '/job/' +
              conf.job +
              '/api/json?' +
              '&tree=builds[building],name,url' +
              '&jsonp=?',
              function(job) {
                  var building = job.builds[0].building;

                  if  (building === false){
                      $('#status').html('<a href="' +
                                        job.url +
                                        '/lastBuild' +
                                        '">Done!</a>');
                  } else {
                      $('#status').text('Building: ' + job.name);
                  }
              });
};

$('button')
    .click(function(){

      var URL = conf.host +
                '/job/' +
                conf.job +
                '/build?delay=0sec';

        formatScriptTag(URL);

        setInterval(
            pollRemoteHost,
            500);



    });
