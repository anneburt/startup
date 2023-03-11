# startup

This repository is for my CS260 class.

# Blocks!

My startup application, 'Blocks!' can be found at https://startup.blocks260.click. The website is still a work in progress, but contains the initial version of the application. Alongside the structure and styling I originally created with HTML and CSS, the game now has functionality with the use of Javascript. 

# Functionality to be added

* Reset button
* Creating account/login
* Determining when there are no more moves possible

# Deployment Command

```
./deployFiles.sh -k <pemkey> -h <domain> -s startup
```

# SSH into server

```
ssh -i [key pair file] ubuntu@[ip address]
```

# Simon

To gain experience using HTML and CSS, I created my own version of the simple memory game called Simon. My implementation can be found at https://simon.blocks260.click.

With HTML, I used many different elements to outline a basic structure and format for the Simon game including multiple pages with navigation to each, input, buttons, lists, drawing, and more.

With CSS and the Bootstrap CSS framework, I was able to make the structure of my website much more visually appealing and added intuitive user interface elements. Later in the course, I will make this game functional with the use of JavaScript.

With Javascript. the game becomes playable. I created a 'play.js' file that controls all the game interactions and stores the result to be displayed on the scores page. For now, the login functionality stores the login name to use to keep track of scores. 
