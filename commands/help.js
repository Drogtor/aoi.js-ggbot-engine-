module.exports = [{
  name: "help",
  code: `$title[1;Help!]
$description[1;Select a category]
$footer[1;Requested By $username#$discriminator]
$color[1;00FF00]
$addButton[1;General;primary;general;no;]
$addButton[1;Admins;primary;admins;no;]
$addButton[1;Owner;primary;owner;no;]
$addButton[2;Moderation;primary;moderation;no;]
$addButton[2;Giveaway;primary;giveaway;no;]`
},{
  name: "general",
  type: "interaction",
  prototype: 'button',
  code: ` $interactionUpdate[
        ;{newEmbed:{title:General help}{description:
Invite - Shows bot invite!
Help - Shows this menu!
Members Count - Shows how many member the server has.}}]
$suppressErrors`
},{
  name: "moderation",
  type: "interaction",
  prototype: 'button',
  code: ` $interactionUpdate[
        ;{newEmbed:{title: Moderation Help}{description: Prefix: g!
Ban - Bans a user (g!ban mention.member Reason)
Kick - Kicks a user (g!kick mention.member reason)}}]
$suppressErrors`
},{
  name: "admins",
  type: "interaction",
  prototype: 'button',
  code: `$interactionUpdate[Coming Soon!]
$suppressErrors`
},{
  name: "owner",
  type: "interaction",
  prototype: 'button',
  code: `$interactionUpdate[Coming Soon!]
$suppressErrors`
},{
  name: "giveaway",
  type: "interaction",
  prototype: 'button',
  code: ` $interactionUpdate[
        ;{newEmbed:{title:Giveaway help}{description:
Giveaway start (g!g!start <time,s,m,h> <winners> <prize>) - Starts a giveaway
Gieaway end (g!gend <giveaway ID>) - Ends a giveaway
Giveaway reroll (g!greroll <giveaway ID>) - Rerolls A giveaway}}] 
$suppressErrors`
},{
  name: "ticket",
  type: "interaction",
  prototype: 'button',
  code: ` $interactionUpdate[
        ;{newEmbed:{title:Ticket help}{description:
New ticket (g!new <subject>) - Makes a new ticket
Ticket Panel (g!panel) - Shows ticket panel
Set role (g!set-role) - Add a role that can see the ticket
Remove ticket role (g!remove-ticket-role) - remove the role that has access to the ticket
Set category (set-category) - set a category to create tickets
Remove category (remove-category) - remove the category that the ticket would be created
Setup Panel (g!setup-panel) - setup a panel where people can click a button to make a ticket
Enable ticket (g!enable-ticket) - enable ticket system }}]
$suppressErrors`
}]