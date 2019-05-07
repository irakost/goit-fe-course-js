'use strict';

const posts = [
    {
        img: "https://placeimg.com/400/150/arch",
        title: "Post title 1",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-1.com'
    },
    {
        img: "https://placeimg.com/400/150/nature",
        title: "Post title 2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-2.com'
    },
    {
        img: "https://placeimg.com/400/150/arch",
        title: "Post title 3",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        link: 'link-3.com'
    }
];

    function createPostCard (data){
        const body = document.querySelector('body');
        let postCard = document.createElement("div");
        postCard.setAttribute('class', "post");
        body.append(postCard);
        let picture = document.createElement('img');
        picture.setAttribute('class', 'post_image');
        picture.setAttribute('src', data.img);
        picture.setAttribute('alt', 'post image');
        postCard.append(picture);
        let title = document.createElement('h2');
        title.setAttribute('class', 'post_title');
        title.textContent = data.title;
        postCard.append(title);
        const text = document.createElement('p');
        text.setAttribute('class', 'post_text');
        text.textContent = data.text;
        postCard.append(text);
        const button = document.createElement('a');
        button.setAttribute('class', 'button');
        button.setAttribute('href', data.link);
        button.textContent = 'Read more';
        postCard.append(button);

    }

    function createCards(posts){
        posts.forEach(function (item) {
            createPostCard(item);
        })
    }
    createCards(posts);