var conf = {
    job : 'example',
    host: 'http://alembic.local:7000'
};

var formatScriptTag = function(src){
    $('head')
        .append('<script src="' +
                src +
                '" type="text/javascript" ' +
                'charset="utf-8"></script>');
};

$('button')
    .click(function(){

      var URL = conf.host +
                '/job/' +
                conf.job +
                '/build';

        formatScriptTag(URL);

        setInterval(
            function (){
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
            },
            500);



    });
