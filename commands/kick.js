module.exports = ({
  name: "kick",
  code: `
  $title[Kick Successfull $getVar[yeah]]
  $description[$username kicked <@$get[id]>
  Reason: $message[2] $message[3] $message[4] $message[5] 
  $message[6]
  Moderator: $username
  $color[1;00FF00]
  
  
  
  $kick[$mentioned[1];$guildID;$message[2]]
    $let[id;$findUser[$message[1]]]

$onlyIf[$findUser[$message[1]]!=$authorID;**$getVar[nah] | You can't kick yourself**] 

$onlyIf[$memberExists[$findUser[$message[1]]]==true;**$getVar[nah] | Couldn't find a member with this ID/name/mention in the server**.] 

$onlyIf[$message[1]!=;$getVar[nah] |** Please mention someone to kick**] 
$onlyPerms[admin; $getVar[nah] You need admin & kick and permissions]
  `
})