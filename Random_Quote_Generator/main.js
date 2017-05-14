   // remove p-tags from quote.content
   function cleanResponse(str) {
       return str.slice(3, -5);
   }

   // encode quote for share request
   function encodeUrl(params) {
       var str = '';
       for (var i in params) {
           str += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]) + '&';
       }
       return str.slice(0, -1);
   }

   function cleanResponse(str) {
       return str.slice(3, -5);
   }


   // get a new quote
   function getNewQuote() {
       $('#quote, #author').empty();
       $.ajax({
               url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
               cache: false,
           })
           .done(function(response) {
               var data = response.shift();
               $('#quote').append(cleanResponse(data.content));
               $('#author').append(data.title);
           })
           .fail(function(response) {
               console.log("error");
           })
           .always(function() {
               console.log("complete");
           });

   }

   //share quote on twiter
   function shareQuote() {
     var quote = $('#quote').text();
     var author = "- By: "+ $('#author').text();
     var dots = '...';
     var alowedLength = 140 - (author.length + dots.length);
     if(quote.length > alowedLength) {
       quote = quote.slice(0, alowedLength) + dots;
     }
       var text = `${quote}${author}`;
       window.open(`https://twitter.com/intent/tweet?text=${text}`);
   }



   $(document).ready(function() {
       // buttons
       var twitBtn = $('#twit-quote');
       var quoteBtn = $('#new-quote');

       // show quote on document load or first visit
       getNewQuote();

       // show quote on button click
       quoteBtn.on('click', getNewQuote);

       // share quote on twiter
       twitBtn.on('click', shareQuote)

   });
