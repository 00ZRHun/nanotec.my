<script>
    var html
    var singleProduct = ''
    var oneRowproductHtml = ''
    /* singleProduct =[
      '<div class="col-sm-6 col-lg-4 ">', 
    ].join("\n") */
  
    for(i = 0; i<3; i++){
      singleProduct += [
        '<div class="row">',  
      ].join("\n")
      
      for(i = 0; i<3; i++){
        singleProduct += [
          '<div class="col-sm-6 col-lg-4 ">', 
            '<div class="product-top product-top-1" >', 
              '<div class="overlay">', 
                '<a href="https://wa.link/9mn548"><button>Learn More</button></a>', 
                '<a href="https://wa.link/9mn548"><button>View Detail</button></a>', 
              '</div>', 
            '</div>', 
            '<div class="product-text">', 
                '<div class="text-center">', 
                  '<span>', 
                    '375(BL)-7546 SIZE.750X460X220mm', 
                  '</span>', 
                '</div>', 
            '</div>', 
          '</div>', 
        ].join("\n")
  
        singleProduct += [
          '</div>',  
        ].join("\n")
  
      }
    }
    // oneRowproductHtml += ('<div class="row" style="display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">' + singleProduct + '</div>')
    oneRowproductHtml += singleProduct
    /* oneRowproductHtml += '<div class="row" style="background-color:red">'
    oneRowproductHtml += singleProduct
    oneRowproductHtml += '</div>' */
    // document.getElementById('displayProduct').innerHTML += html
    
    // OPTION 1 (WORK) //
    document.getElementById('displayProduct').innerHTML += oneRowproductHtml
    console.log(oneRowproductHtml)
    // OPTION 2 (NOT WORK) //
    // *** CHK IT OUT ***
    // document.getElementById('displayProduct').append(html)
  
  </script>