module.exports =  [{
  name: "userinfo",
  aliases: ['uinfo'],
  code: `
$title[1;$username[$mentioned[1]]#$discriminator[$mentioned[1]]]
$description[1;
User Id: $mentioned[1]
Account creation date: $creationDate[$mentioned[1];time]
Joined Discord: $creationDate[$mentioned[1];time]
Server Joined: $formatDate[$memberJoinedDate[$mentioned[1]]]
Bot: $isBot[$mentioned[1]]
Roles: $userRoles[$mentioned[1];$guildID;mention;,]
$thumbnail[$userAvatar[$mentioned[1]]]
]
`
}]