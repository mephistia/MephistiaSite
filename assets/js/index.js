export function activeLink(){
    const menu = document.querySelector('nav');
    const path = window.location.pathname.split('/').pop();
    console.log(path);
    menu.querySelector(`.home-link`).classList.add('active-link');

    if (path.length > 0){
        menu.querySelector(`a[href="/${path}"]`).classList.add('active-link');
        menu.querySelector(`.home-link`).classList.remove('active-link');
    }
}

export function mobileMenu(){
    const nav = document.querySelector('.sidebar');
    const filters = document.querySelector('.filters');

    const obs = new IntersectionObserver(
        (e) => {
            e.forEach(entry => {
                entry.target.classList.toggle('notSticky');
            })
        },
        {rootMargin: '-26px 0px 500px 0px', threshold: .75}
    );

    obs.observe(nav);

    if (filters){
        obs.observe(filters);
    }


    // mudar no scroll
    let didScroll;
    window.addEventListener('scroll', () => {
        didScroll = true;}
    ); 
    let lastScrollTop = 0;

    const delta = 5;

    function hasScrolled(){
        let topOffset = window.scrollY;
        if (topOffset <= delta){
            nav.classList.remove('nav-showing');
            if (filters){
                filters.classList.remove('nav-showing');
            }
            return;
        }    
        
        if (filters){
            if (topOffset > lastScrollTop
                && !filters.classList.contains('nav-hidden')){
                    filters.classList.add('nav-hidden');
                    filters.classList.remove('nav-showing');
                }

                else {
                    if (topOffset < lastScrollTop && filters.classList.contains('nav-hidden')){
                        filters.classList.remove('nav-hidden');
                        filters.classList.add('nav-showing');
                    }
                }
        }
        
        if (topOffset > lastScrollTop 
        && !nav.classList.contains('nav-hidden') && !nav.classList.contains('notSticky')){
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-showing');
            
        }
        else {
            if (topOffset < lastScrollTop && nav.classList.contains('nav-hidden')){
                nav.classList.remove('nav-hidden')
                nav.classList.add('nav-showing');                    
               
            }
        }
        lastScrollTop = topOffset;
    }

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

}



AOS.init({
    delay: 50,
    duration: 500,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
});



window.onload = function() {
    // modify captions to add links
    modifyCaptions();

    // active link on menu
    activeLink();

    // SimpleLightbox
    const lb = new SimpleLightbox({
        elements: '.gallery a'
    });
}




mobileMenu();

const gallery = document.querySelector('.gallery');

const isotope = new Isotope(gallery, {
        percentPosition: true,
        itemSelector: 'article',
        initLayout: true,
        layoutMode: 'masonry',
        masonry: {
            gutter: '.gutter-size',
            columnWidth: '.illustration'
        }
});
           
isotope.arrange({
    filter: '*'
});

const imgLoad = imagesLoaded(gallery);
imgLoad.on('progress', function(){
    // isotope
    isotope.layout();
})

const filters = document.querySelector('.filters');

const allBtn = filters.querySelector('button[data-filter="*"]');
const illustBtn = filters.querySelector('button[data-filter=".illustration"]');
const webdesignBtn = filters.querySelector('button[data-filter=".web-design"]');

allBtn.onclick = function(){
    isotope.arrange({
        filter: getFilterFrom(allBtn)
    });
    filters.querySelector('.active-btn').classList.remove('active-btn');
    allBtn.classList.add('active-btn');
};

illustBtn.onclick = function(){
    isotope.arrange({
        filter: getFilterFrom(illustBtn)
    });
    filters.querySelector('.active-btn').classList.remove('active-btn');
    illustBtn.classList.add('active-btn');
};

webdesignBtn.onclick = function(){
    isotope.arrange({
        filter: getFilterFrom(webdesignBtn)
    });
    filters.querySelector('.active-btn').classList.remove('active-btn');
    webdesignBtn.classList.add('active-btn');
};

function getFilterFrom(item){
    return item.getAttribute('data-filter');
}
      
function modifyCaptions(){
    let caption = document.querySelector('#base-code');
    if (caption){
        caption.setAttribute('title', 'Base Code theme for Tumblr. Live Preview <a href="mephistia-base.tumblr.com/" class="accent-color">here</a>');
    }  

    caption = document.querySelector('#serpens-cauda');
    if (caption){
        caption.setAttribute('title', 'Serpens Cauda theme for Tumblr. Static Previews <a href="https://mephistia-previews.tumblr.com/serpens-cauda-theme-1" class="accent-color">here (version 1)</a> and <a href="https://mephistia-previews.tumblr.com/serpens-cauda-theme-2" class="accent-color">here (version 2)</a>');
    }  

    caption = document.querySelector('#shadows');
    if (caption){
        caption.setAttribute('title', 'Shadows theme for Tumblr. Static Previews <a href="https://mephistia-previews.tumblr.com/shadows-1" class="accent-color">here (version 1)</a> and <a href="https://mephistia-previews.tumblr.com/shadows-2" class="accent-color">here (version 2)</a>');
    }

    caption = document.querySelector('#ice-bee');
    if (caption){
        caption.setAttribute('title', 'Ice Bee theme for Tumblr. Static Preview <a href="https://mephistia-previews.tumblr.com/1cebee-theme" class="accent-color">here</a>');
    }

    caption = document.querySelector('#ice-bee');
    if (caption){
        caption.setAttribute('title', 'Ice Bee theme for Tumblr. Static Preview <a href="https://mephistia-previews.tumblr.com/1cebee-theme" class="accent-color">here</a>');
    }

    caption = document.querySelector('#redemption');
    if (caption){
        caption.setAttribute('title', 'Redemption theme for Tumblr. Static Preview <a href="https://mephistia-previews.tumblr.com/1cebee-theme" class="accent-color">here</a>');
    }

    caption = document.querySelector('#fortflix');
    if (caption){
        caption.setAttribute('title', 'FortFlix business website. Live Preview <a href="https://fortflix.com.br" class="accent-color">here</a>');
    }
}


