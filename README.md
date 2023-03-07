# startup

This repository is for my CS260 class.

# Blocks!

My startup application, 'Blocks!' can be found at https://startup.blocks260.click. The website is still a work in progress, but contains the initial version of the application. So far, I have been able to create my own structure and styling through HTML and CSS. I plan to add functionality to the game, and pop up windows for each button using Javascript as I become more familiar with the language. 

# Deployment Command

```
./deployFiles.sh -k <pemkey> -h <domain> -s startup
```

# SSH into server

```
ssh -i [key pair file] ubuntu@[ip address]
```

# 'Blocks!' Elevator Pitch

'Blocks!' would be a great game to play in the background of meetings or class. It's simple enough that anyone can play, but tricky enough to keep players engaged. As soon as you open the website, you would be able to start playing by clicking and dragging blocks onto the board. The goal would be to create rows, columns, and 9x9 squares of blocks to create more room for new blocks.

Below are some rough sketches of the application:

![website1](https://user-images.githubusercontent.com/71862670/215231975-ffbc6fd2-e6cc-45a9-9cb9-f61cef3bdebf.jpg)
![website2](https://user-images.githubusercontent.com/71862670/215231980-74bafe7b-d892-43b2-8991-a2150a774fb9.jpg)


# Simon

To gain experience using HTML and CSS, I created my own version of the simple memory game called Simon. My implementation can be found at https://simon.blocks260.click.

With HTML, I used many different elements to outline a basic structure and format for the Simon game including multiple pages with navigation to each, input, buttons, lists, drawing, and more.

With CSS and the Bootstrap CSS framework, I was able to make the structure of my website much more visually appealing and added intuitive user interface elements. Later in the course, I will make this game functional with the use of JavaScript.

With Javascript. the game becomes playable. I created a 'play.js' file that controls all the game interactions and stores the result to be displayed on the scores page. For now, the login functionality stores the login name to use to keep track of scores. 
