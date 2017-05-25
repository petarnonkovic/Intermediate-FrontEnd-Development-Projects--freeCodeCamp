var randomArticle = {
    redirect: function() {
        const url = "https://en.wikipedia.org/wiki/Special:Random";
        window.open(url, "_blank");
    },
    redirectListener: function() {
        var btn = document.getElementById('random_wiki');
        btn.addEventListener('click', this.redirect, false);
    }
};

$(document).ready(function() {
    // handle random article request
    randomArticle.redirectListener();

    // handle search request
    var srsearch = '';
    var sroffset = 0;

    //result container
    var section = $('#resWrapp');

    function browseWiki(offset) {
        const url = "https://en.wikipedia.org/w/api.php";
        let queryparam = {
            action: 'query',
            format: 'json',
            formatversion: 2,
            list: 'search',
            srprop: 'snippet',
            srlimit: 5,
            srinfo: 'totalhits',
            srsearch: srsearch
        };

        if (offset != 0) queryparam.sroffset = offset;

        return $.ajax({
            url: url,
            dataType: 'jsonp',
            data: queryparam,
            jsonp: 'callback'
        });
    }

    function showArticles(data) {
        data.query.search.forEach(function(article) {
            var articleLink = "https://en.wikipedia.org/wiki/" + article['title'].replace(/\s/g, '_');
            var articleContainer = $('<div class="well"></div>');
            var articleContent = $('<h3 class="res_title">' + article.title + '</h3><p class="res_text">' + article.snippet + '</p><p class="link_holder">[ <a class="res_link" target="_blank" href="' + articleLink + '"> ... read all on Wiki </a>]</p>');

            // collect data about article
            articleContainer.append(articleContent);

            // and append it to section
            articleContainer.appendTo(section);
        });

        // check if response object have continue prop
        // if true there is more result to display
        if (data.hasOwnProperty('continue')) {
            var loadButton = $('<p><button id="loadBtn" class="load_button">Load Next Result Set</button></p>');
            loadButton.appendTo(section);
            sroffset = data.continue.sroffset;
        }
    }


    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        srsearch = $('#searchWiki').val().trim();
        if (srsearch != '') {
            srsearch = encodeURI(srsearch);
            section.empty();
            browseWiki(0).done(function(data) {
                var totalHits = data.query.searchinfo.totalhits;
                $('#totalHits').text(totalHits + ' hits').fadeIn(400);
                if (totalHits == 0) {
                    $('p.errors').text('No results found! Please try again.').fadeIn(400);
                } else {
                    showArticles(data);
                }
            });
        } else {
            $('p.errors').text('Nothing to search for! Please enter search value.').fadeIn(400);
        }
    });

    section.on('click', '#loadBtn', function() {
        $(this).remove();
        browseWiki(sroffset).done(showArticles);
    });

});
