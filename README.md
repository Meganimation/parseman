
<h1>PARSEMAN</h1>

Parseman is an Automatic template creation and version control create a standard format for machine data—at a 90 percent lossless compression rate. Parseman proprietary algorithm automatically maps data—in any format—in real time. Version control and automatic template creation funnel machine data into a standard format at a 90 percent lossless compression rate. So no more debugging regular expression testing or grok.

Note: The App is <b>not</b> Mobile-friendly.

<h2>PREREQUSITES</h2>

To get started, first you’ll need to configure your VPN settings. We recommend using <a href="https://www.wireguard.com/">Wireguard</a> for this.

<h3>What is Wireguard?</h3>

WireGuard is designed as a general purpose VPN for running on embedded interfaces and super computers alike, fit for many different circumstances. Initially released for the Linux kernel, it is now cross-platform (Windows, macOS, BSD, iOS, Android) and widely deployable.


<h3>How to Setup Wireguard</h3>
	First, you will need a private key to access our VPN. You can email <a href="mailto:meganoliviawendyadams@gmail.com">here></a> for access. 
<li>Install Wireguard on your machine. To see installation commands suitable for your Operating System click <a href="https://www.wireguard.com/install/">here</a> </li>
<li>Follow to quick-start guide here to configure the wg client <a href="https://www.wireguard.com/quickstart/">here</a></li>
<li>Open up wg0.conf in your /etc/wireguard/ directory. If you do now have a wg0.conf  file, you can create one. (Note: This is a hidden file, you can learn more about accessing hidden files below:
  <ul>For windows: https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5</ul>
  <ul>For mac: https://www.pcmag.com/how-to/how-to-access-your-macs-hidden-files#:~:text=View%20Hidden%20Files%20in%20Finder,%2C%20Applications%2C%20and%20Desktop%20folders.</ul>
  <ul>For linux: https://phoenixnap.com/kb/show-hidden-files-linux#:~:text=First%2C%20browse%20to%20the%20directory,box%20to%20Show%20hidden%20files.</ul>
</li>
<li>In the wg0.conf, paste the following (Don’t forget to replace the PrivateKey with the one you obtained):</li>
<code> //fix formatting
[Interface]
Address = 100.64.24.2/24
DNS = 10.12.2.2, 10.12.2.3, local.sliceup.co
PrivateKey = [INCLUDE YOUR PRIVATE KEY HERE]

[Peer]
PublicKey = G4BbtxgD1ticgqUmPfmgJl7rdkF4Z3qWG0WVeuek8hg=
AllowedIPs = 100.64.24.0/24, 10.12.2.0/24, 10.14.0.0/16
PersistentKeepalive = 21
Endpoint = 45.19.220.211:53024.
</code>

<li> In the terminal, type wg-quick up wg0 </li>
<li>You can then confirm that everything is running by entering in the terminal sudo wg show</li>

If all has been entered correctly, you should see something that represents the following:
![image](https://user-images.githubusercontent.com/49360430/188944314-74fa2f83-ca43-4e23-921f-3e62b5b3d54e.png)


<b>You are now ready to launch the app!</b>


<h3>What if I can’t/don’t want to access a private key?</h3>

If you do not wish to install wireguard and/or access the private key, you can view the application with limited functionality mode via enabling OFFLINE mode, persue the following:


<ol>1. Within the codebase, access the .env file (Don’t forget to save afterwards!)</ol>
<ol>2. Replace REACT_APP_URL = http://clickhouseapi-goofy.kubeprod.sliceup.co/ with
REACT_APP_URL = OFFLINE </ol>


NOTE TO SELF, MAKE ENV FILE MORE SEAMLESS (Remove undeed envs and all that)

As mentioned, OFFLINE mode has very limited functionality and may be prone to breaking. I recommend this method if you would like to have access to the UI without having to setup the wireguard client. If you wish to access the capabilities of Parseman, I recommend installing wireguard or contacting one of us to provide you with a private key or demo. 


<h2>GENERAL INSTALLATION</h2>

<ol>1. Clone this repo (maybe add code here)</ol>
<ol>2. Open in your favorite IDE, and in the terminal, install npm (add code here)</ol>
<ol>3. Once all the node packages have finished installing, start the application (add code here)</ol>
<ol>4. The browser should automatically open and is ported to localhost:300 (double check this)</ol>

<h3>ACCESSING STORYBOOK<h3>
<a href="https://storybook.js.org/">Storybook</a> is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

 To run storybook, enter <code>npm run storybook</code> into the terminal.

<h3>CCESSING SWAGGER</h3>
For API references, you can refer to the <a href="http://10.12.2.249:8081/swagger-ui/">swagger</a> docs.



<h3>TROUBLESHOOTING</h3>
	If you come across any issues with installation, please email me <a href="mailto:meganoliviawendyadams@gmail.com">here></a> and I’ll be happy to assist.

<h2>NAVIGATING THE APP</h2>

This project utilizes React and as such is component driven. You can see a diagram of the component tree below:
 DIAGRAM HERE

You will notice that the application is split up into a number amount of components. Some are <a href="https://xd.adobe.com/ideas/process/ui-design/atomic-design-principles-methodology-101/">atomic</a> components, and are commonly resued, others are major components and are treated more like pages. 

The major components are as follow:

<ol>1.	NavBar: This component is used to handle all search queries. It is responsible for each state handed to the majority of the fetch requests made in this app.</ol>
<ol>2.	Wordcloud: This component returns a word cloud containing references of related bad words to the user. The amount of words should appear via the reference of their individual size. </ol>
<ol>3.	Menu: Side menu which is accessible in the right hand menu, currently built for anticipation of added features, but for now has some basic elements such as accessing previously saved tables and toggling light mode.</ol>
<ol>4.	LogtailComponent: Fetches all logtail data which is returned from the search parameter.</ol>
<ol>5.	TemplateList: Brings all parsed template lists referencing the key works from the searchbar and separated them by templateId, templateLiteral, amount AND MORE, the user shoud be able to interact with these items and select one to further parse. Upon clicking the parse button, the following component should appear:</ol>
<ol>6.	ParsedDataTable: It returns a table containing every response allocated with the templates their potential variables. This component is the heaviest and can contain tens of thousands of responses, with each response bringing a different amount of columns and rows which are individually restructured on the front-end to visualize properly. Please see this file (FILE TO WHERE I DID BARE WORK).  Once we have the api response, we can choose how many to render before presenting to the user. Sorting rows is currently handled on the front-end and as such can require lengthy loading times to process the data. This is currently handled by locking the amount of responses allowed, with the user having to capability to change this setting in-app if needed. Note: This may be further explained in detail.</ol>


<h2>Incomplete Tasks</h2>

Parseman does not have the following features yet to be built: 

<ul>oAuth.</ul>
<ul>Finalized TypeScript.</ul>
<ul>Cookies or localStorage handling.</ul>
<ul>Current bugs: (Paste from smartsheet)</ul>

UX REFERENCE: <a href="https://xd.adobe.com/view/902fd948-72a7-4394-b89c-853ed1ab1993-c57c/screen/7517473d-cb27-47ce-8a99-026a0dd9e8ca/specs/">here</a>

Credit: Megan Adams

Demo: https://www.sliceup.co/parsman
