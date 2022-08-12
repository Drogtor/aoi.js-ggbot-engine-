module.exports = [{
name: "gstart",
    code: `

$setMessageVar[host;$authorID;$get[id]]
$setMessageVar[win;$message[2];$get[id]]
$setMessageVar[time;$message[1];$get[id]]
$setMessageVar[date;$dateStamp;$get[id]]
$setMessageVar[prize;$messageSlice[2];$get[id]]
$setTimeout[gw;$get[sc]s;{
"cid":"$channelID",
"date":"$dateStamp",
"time":"$message[1]",
"host":"$authorID",
"win":"$message[2]",
"mid":"$get[id]",
"prize":"$messageSlice[2]"
}]
$let[sc;$splitText[1]$textSplit[$math[$get[p]/1000];.]]
$let[id;$sendMessage[Giveaway Start! {reactions:🎉} {newEmbed:{title:$messageSlice[2]} {description:End in: <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R>
[click here to see the real timer](https://give-aways.ga/?id=$math[$datestamp+$parseTime[$message[1]]])
Host: <@!$authorID>
Winner: $message[2]} {color:BLUE}};yes]]

$onlyIf[$messageSlice[2]!=;The prize must be given]
$onlyIf[$isNumber[$message[2]]==true;The given winner must be number and higher than 0]
$onlyIf[$get[p]!=-1;The given time is invalid, please provide valid time like \`1s, 1m, 1d.....\` The correct usage: \`(prefix)gstart (time) (winner) (prize)]
$let[p;$parseTime[$if[$message[1]!=;$message[1];1s10ms]]]
$onlyPerms[managemessages;You have no perms]
`

},
 {
  name: "gw",
     type: "timeout",
     code: `
$editMessage[$timeoutData[mid];Giveaway Ended! {newEmbed:{title:$timeoutData[prize]} {description:End in:Giveaway has been ended
[click here to see the real timer](https://give-aways.ga/?id=$math[$timeoutData[date]+$parseTime[$timeoutData[time]]])
Host: <@!$timeoutData[host]>
Winner(s):$if[$get[random]==;No winner (no participant);$get[random]]} {color:RED}};$timeoutData[cid]]
$channelSendMessage[$timeoutData[cid];$if[$get[random]!=;Congrats $get[random] you won **$timeoutData[prize]**;Not enough participants]]

$let[random;$djsEval[
var arrayy = "$getReactions[$timeoutData[cid];$timeoutData[mid];🎉;yes;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = $timeoutData[win]
while (u != 0 && array.length > 0) {
let r = Math.floor(Math.random()*array.length); 
win += "<@!"+array[r]+">" + " "
array.splice(array.indexOf(array[r]), 1)

u = u - 1

}
win.split(" ").filter(function(a) {
return a!='<@!undefined>' && a != ''
}).join(", ")
;yes]]
$onlyIf[$getMessage[$timeoutData[cid];$timeoutData[mid]]!=Giveaway Ended!;]
`
     
},
{
    name: "gend",
    code: `
$editMessage[$message[1];Giveaway Ended! {newEmbed:{title:$getMessageVar[prize;$message[1]]} {description:End in:Giveaway has been ended
[click here to see the real timer](https://give-aways.ga/?id=$math[$getMessageVar[date;$message[1]]+$parseTime[$getMessageVar[time;$message[1]]]])
Host: <@!$getMessageVar[host;$message[1]]>
Winner(s):$if[$get[random]==;No winner (no participant);$get[random]]} {color:RED}};$channelID]
$SendMessage[$if[$get[random]!=;Congrats $get[random] you won **$getMessageVar[prize;$message[1]]**;Not enough participants]]

$let[random;$djsEval[
var arrayy = "$getReactions[$channelID;$message[1];🎉;yes;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = $getMessageVar[win;$message[1]]
while (u != 0 && array.length > 0) {
let r = Math.floor(Math.random()*array.length); 
win += "<@!"+array[r]+">" + " "
array.splice(array.indexOf(array[r]), 1)

u = u - 1

}
win.split(" ").filter(function(a) {
return a!='<@!undefined>' && a != ''
}).join(", ")
;yes]]
$onlyIf[$getMessage[$channelID;$message[1]]!=Giveaway Ended!;That provided giveaway id is already ended or invalid]
$onlyIf[$message[1]!=;Give the valid message id]
$onlyPerms[managemessages;You have no perms]
`
    },
 {
    name: "greroll",
    code: `
$editMessage[$message[1];Giveaway Ended! {newEmbed:{title:$getMessageVar[prize;$message[1]]} {description:End in:Giveaway has been ended
[click here to see the real timer](https://give-aways.ga/?id=$math[$getMessageVar[date;$message[1]]+$parseTime[$getMessageVar[time;$message[1]]]])
Host: <@!$getMessageVar[host;$message[1]]>
Winner(s):$if[$get[random]==;No winner (no participant);$get[random]]} {color:RED}};$channelID]
$SendMessage[$if[$get[random]!=;Congrats $get[random] you won **$getMessageVar[prize;$message[1]]**;Not enough participants]]

$let[random;$djsEval[
var arrayy = "$getReactions[$channelID;$message[1];🎉;yes;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = 1
while (u != 0 && array.length > 0) {
let r = Math.floor(Math.random()*array.length); 
win += "<@!"+array[r]+">" + " "
array.splice(array.indexOf(array[r]), 1)

u = u - 1

}
win.split(" ").filter(function(a) {

return a!='<@!undefined>' && a != '' && a != 'undefined'

}).join(", ")

;yes]]
$onlyIf[$getMessage[$channelID;$message[1]]==Giveaway Ended!;Giveaway with that provided id is not ended yet, or invalid]
$onlyIf[$message[1]!=;Give valid message id]
$onlyPerms[managemessages;You have no perms]
`
    }]