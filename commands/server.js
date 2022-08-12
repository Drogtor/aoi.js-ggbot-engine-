module.exports = [{
  name: "server",
  aliases: ['s'],
  code: `
  $title[1;My current server & All member]
  $description[1;$serverCount servers!
  Server Names: $serverNames[,]
  - - - - - - - - - - - - - - - - - 
  $allMembersCount Members global!]
  $footer[1;Requested By $username#$discriminator]`
}]