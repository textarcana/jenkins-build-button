var formatScriptTag = function(src){
    $('head')
        .append(
            '<script src="'
                + src
                + '" type="text/javascript" '
                + 'charset="utf-8"></script>'
        );
};

$('button')
    .click(function(){
        var URL = 'http://alembic.local:7000/job/example/build?delay=0sec';
        formatScriptTag(URL);

        setInterval(
            function (){
                $.getJSON('http://alembic.local:7000/job/example/api/json?depth=1&tree=builds[building]&jsonp=?',
                          function(data) {
                              var building = data.builds[0].building;

                              if  (building === false){
                                  $('#status').text('Build complete!');
                              } else {
                                  $('#status').text('Building...');
                              }
                          });
            },
            500);



    });
