module.exports = ({
  name: "ban",
  code: `
  $title[Ban Successfull $getVar[yeah]]
  $description[$username Banned <@$get[id]>
  Reason: $message[2] $message[3] $message[4] $message[5] 
  $message[6]
  Moderator: $username
  $color[1;00FF00]
  
  
  
  $ban[$guildID;$get[id];;$message[2]]
    $let[id;$findUser[$message[1]]]

$onlyIf[$findUser[$message[1]]!=$authorID;**$getVar[nah] | You can't ban yourself**] 

$onlyIf[$memberExists[$findUser[$message[1]]]==true;**$getVar[nah] | Couldn't find a member with this ID/name/mention in the server**.] 

$onlyIf[$message[1]!=;$getVar[nah] |** Please mention someone to ban**] 
$onlyPerms[admin; :x: You need admin & ban and permissions]
  `
})
