module.exports = [{
  name: "serverinfo",
  aliases: ['info'],
  code: `
  $title[1;$serverName Server Info]
  $description[1;
  **Server Name: $serverName ($guildID)**
  **Server Owner: <@$ownerid>**
  - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  __**Server Channel Count:**__
  **Text: $channelCount[$guildID;Text]**
  **Voice: $channelCount[$guildID;Voice]**
  **Stages: $channelCount[$guildID;Stage]**
  **Categories:$channelCount[$guildID;Category]**
  **Total Off: $channelCount**
  - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  **Server Members: $membersCount**
  **Server Created: $creationDate[$guildID;date;no]**
  **Server Roles: $roleCount**
  **Server Boosts: $serverBoostCount[$guildID]**
  **Server Boost level: $serverBoostLevel**
  - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  __**Server Emoji Count**__
  Animated: $emojiCount[$guildID;animated]
  Normal: $emojiCount[$guildID;normal] 
  Total Of Emojis: $emojiCount[$guildID;all]
  
  Emojis: $serverEmojis
  - - - - - - - - - - - - - - - - - - - - - - - - - - -
  $thumbnail[$serverIcon]
  $color[1;00FF00]
  $footer[Requested By $username]
  `
}];