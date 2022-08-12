module.exports = [{
    name: "new",
    aliases: ['new-ticket', 'new-tick', 'nt', 'ticket', 'tick'],
    usage: "ticket <message>",
    description: "create a ticket",
    $if: "v4",
    code: `$modifyChannelPerms[$getServerVar[tick_r];$get[id];+viewchannel]
    $onlyif[$roleExists[$getServerVar[tick_r];$guildID]==true;]
    $modifyChannelPerms[$authorID;$get[id];+viewchannel]
    $modifyChannelPerms[$guildID;$get[id];-viewchannel]
    
    $editMessage[$get[msg];{newEmbed:{thumbnail:$serverIcon}{title:Ticket - $userTag}{color:BLUE}{description:$get[tick_descr]}{footer:$username[$clientID] ticket system:$userAvatar[$clientID]}{timestamp}};$get[id]]
    $wait[1ms]
    $let[msg;$channelSendMessage[$get[id];{"embeds" : "{newEmbed:{title:Ticket ~ $userTag}{color:BLUE","components" : "{actionRow:{button:Claim:primary:claim:no:🖐️}{button:Close:danger:close:no:🔒}}"};yes]]
	$wait[1ms]
    $sendMessage[Created! <#$get[id]>;no]

    $setUserVar[tick;$get[id]]
    $setChannelVar[tick;true-$authorID;$get[id]]
    
    $let[tick_descr;Hey <@$authorID>, this is your ticket!

        Please, state down below your whole problem,
        provide any detail you can so the staff can help you faster.
        Our staff team will answer soon as possible!
        
        Please run \`$getServerVar[prefix]close\` when your problem has been solved
        or use the "\`close\`" red button below.
        
        Be patient till a staff check your ticket!
        
        **Close Button**
        > You or the staff can use this button to close the ticket.
        
        **Claim Button**
        > The staff can use this button to claim the ticket.
        
        ~ **Ticket subject:** $if[$message!=] 
        $message 
        $else \`Not Provided\`
        $endif]
    $if[$channelExists[$getServerVar[tick_c]]==true]
    $let[id;$createChannel[$guildID;tick-$userTag;text;yes;$getServerVar[tick_c]]]
    $else
    $let[id;$createChannel[$guildID;tick-$userTag;text;yes]]
    $endif

    $onlyif[$channelExists[$getUserVar[tick]]==false;You already have a ticket <#$getUserVar[tick]>]
    $onlyif[$hasPerms[$guildID;$clientID;admin]==true;I don't have \`ADMIN\` perms]
    $onlyif[$getServerVar[tick]==true;Ticket system is disabled, tell an admin to run \`$getServerVar[prefix]enable-ticket\`]
    `
},{
    name: "panel",
    usage: "panel",
    description: "get the ticket panel buttons",
    code: `$title[1;Panel Buttons]
    $description[1;Here is the ticket panel]
    $color[1;BLUE]
    $addButton[1;Close;danger;close;no;🔒]
    $addButton[1;Claim;primary;claim;$if[$channelTopic==none;no;yes];🖐️]
    $onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:RED}}]
    `
},{
    name: "set-role",
    aliases: ['ticket-role','tick-role'],
    usage: "set-role @role",
    description: "add a role that can see the ticket",
    code: `$setServerVar[tick_r;$findRole[$message[1]]]
    I set $roleName[$findRole[$message[1]]] as a ticket role
    $onlyif[$roleExists[$findRole[$message[1]]]==true;Please provie a valid role]
    $onlyPerms[admin;You don't have \`ADMIN\` perms]`
},{
    name: "set-category",
    aliases: ['ticket-category','tick-category'],
    usage: "set-category <category ID>",
    description: "set a category to create tickets",
    code: `$setServerVar[tick_c;$findChannel[$message[1]]]
    I set <#$findChannel[$message[1]]> as a ticket category
    $onlyif[$channelType[$findChannel[$message[1]]]==category;Please sepcify a category channel]
    $onlyif[$channelExists[$findChannel[$message[1]]]==true;Please provide a valid channel]
    $onlyPerms[admin;You don't have \`ADMIN\` perms]`
},{
    name: "remove-ticket-role",
    aliases: ['remove-tick-role','remove-role'],
    usage: "remove-ticket-role",
    description: "remove the role that has access to the ticket",
    code: `$setServerVar[tick_r;]
    Successfully removed the ticket role
    $onlyPerms[admin;You don't have \`ADMIN\` perms]`
},{
    name: "remove-category",
    usage: "remove-category",
    description: "remove the category that the ticket would be created",
    code: `$setServerVar[tick_c;]
    Successfully removed the ticket category
    $onlyPerms[admin;You don't have \`ADMIN\` perms]
    `
},{
    name: "setup-panel",
    aliases: ['tick-panel','ticket-panel'],
    usage: "setup-panel #channel",
    description: "setup a panel where people can click a button to make a ticket",
    code: `$channelSendMessage[$channelID;Successfully setup the ticket panel]
    $usechannel[$findChannel[$message[1];yes]]
    $color[1;ed3491]
    $title[1;Open a ticket]
    $description[1;Click the button to open a ticket!]
    $footer[1;$username[$clientID] ticket system;$userAvatar[$clientID]]
    $addButton[1;Click to open;primary;tick;no;📨]
    $onlyif[$getServerVar[tick]==true;Ticket system is disabled, tell an admin to run \`$getServerVar[prefix]enable-ticket\`]
    `
},{
    name: "enable-ticket", 
    usage: "enable-ticket",
    description: "enable ticket system",
    code: `$setServerVar[tick;true]
    Successfully enabled ticket system
    $onlyPerms[admin;You don't have \`ADMIN\` perms]`
},{
    name: "disable-ticket",
    usage: "disable-ticket",
    description: "disable ticket system",
    code: `$setServerVar[tick;false]
    Successfully disabled ticket system
    $onlyPerms[admin;You don't have \`ADMIN\` perms]`
},{
    name: "claim",
    usage: "claim",
    description: "claim a ticket",
    code: `$setChannelTopic[$channelID;🖐️ This ticket has been claimed by <@$authorID>]
    $modifyChannelPerms[$guildID;$channelID;-sendmessage]
    $modifyChannelPerms[$authorID;$channelID;+sendmessage]
    $modifyChannelPerms[$advancedTextSplit[$getChannelVar[tick];-;2];$channelID;+sendmessage]
    $title[1;Ticket Claimed]
    $description[1;This ticket has been claimed by <@$authorID>]
    $color[1;BLUE]
    $onlyif[$channelTopic==none;{newEmbed:{title:Error}{description:This ticket is already claimed}{color:RED}}]
    $onlyif[$getUserVar[tick]!=$channelID;{newEmbed:{title:Error}{description:You can't claim your own ticket}{color:RED}}]    
    $onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:RED}}]
    `
},{
    name: "close",
    usage: "close",
    description: "close a ticket",
    code: `$deleteChannel[$channelID]
    $wait[10s]
    $channelSendMessage[$channelID;{newEmbed:{title:Close Ticket}{description:🔒 This ticket will close in 10s}{color:RED}}]
    $onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:RED}}]
    `
},{
    name: "close",
    type: "interaction",
    prototype: "button",
    code: `$deleteChannel[$channelID]
    $wait[10s]
    $interactionReply[;{newEmbed:{title:Close Ticket}{description:🔒 This ticket will close in 10s}{color:RED}}]
    `
},{
    name: "claim",
    type: "interaction",
    prototype: "button",
    code: `$setChannelTopic[$channelID;This ticket has been claimed by <@$authorID>]
    $modifyChannelPerms[$guildID;$channelID;-sendmessage]
    $modifyChannelPerms[$authorID;$channelID;+sendmessage]
    $modifyChannelPerms[$advancedTextSplit[$getChannelVar[tick];-;2];$channelID;+sendmessage]
    $interactionReply[;{newEmbed:{title:Ticket Claimed}{description:This ticket has been claimed by <@$authorID>}{color:BLUE}}]
    $onlyif[$channelTopic==none;{
        "content" : " ",
        "embeds" : "{newEmbed:{title:Error}{description:$channelTopic}{color:RED}}",
        "ephemeral" : true,
        "options" : {
            "interaction" : true
        }
    }]
    $onlyif[$getUserVar[tick]!=$channelID;{
        "content" : " ",
        "embeds" : "{newEmbed:{title:Error}{description:You can't claim your own ticket}{color:RED}}",
        "ephemeral" : true,
        "options" : {
            "interaction" : true
        }
    }]
    `
},{
    name: "tick",
    type: "interaction",
    prototype: "button",
    code: `$interactionModal[Hello there!;tick;
        {actionRow:
          {textInput:Why you want to make a ticket?:1:Reason:yes}]
          
    $onlyif[$channelExists[$getUserVar[tick]]==false;{
        "content" : "You already have a ticket <#$getUserVar[tick]>",
        "ephemeral" : true,
        "options" : {
            "interaction" : true
        }
    }]
    $onlyif[$hasPerms[$guildID;$clientID;admin]==true;{
        "content" : "I don't have \`ADMIN\` perms",
        "ephemeral" : false,
        "options" : {
            "interaction" : true
        }
    }]
    $onlyif[$getServerVar[tick]==true;{
        "content" : "Ticket system is disabled, tell an admin to run \`$getServerVar[prefix]enable-ticket\`",
        "ephemeral" : false,
        "options" : {
            "interaction" : true
        }
    }]`
},{
    name: "tick",
    type: "interaction",
    prototype: "modal",
    $if: "v4",
    code: `$modifyChannelPerms[$getServerVar[tick_r];$get[id];+viewchannel]
    $onlyif[$roleExists[$getServerVar[tick_r];$guildID]==true;]
    $modifyChannelPerms[$authorID;$get[id];+viewchannel]
    $modifyChannelPerms[$guildID;$get[id];-viewchannel]
    
    $editMessage[$get[msg];{newEmbed:{thumbnail:$serverIcon}{title:Ticket - $userTag}{color:BLUE}{description:$get[tick_descr]}{footer:$username[$clientID] ticket system:$userAvatar[$clientID]}{timestamp}};$get[id]]
    $wait[1ms]
    $let[msg;$channelSendMessage[$get[id];{"embeds" : "{newEmbed:{title:Ticket ~ $userTag}{color:BLUE","components" : "{actionRow:{button:Claim:primary:claim:no:🖐️}{button:Close:danger:close:no:🔒}}"};yes]]
     $interactionReply[Created! <#$get[id]>;;;;;yes]

    $setUserVar[tick;$get[id]]
    $setChannelVar[tick;true-$authorID;$get[id]]
    
    $let[tick_descr;Hey <@$authorID>, this is your ticket!

        Please, state down below your whole problem,
        provide any detail you can so the staff can help you faster.
        Our staff team will answer soon as possible!
        
        Please run \`$getServerVar[prefix]close\` when your problem has been solved
        or use the "\`close\`" red button below.
        
        Be patient till a staff check your ticket!
        
        **Close Button**
        > You or the staff can use this button to close the ticket.
        
        **Claim Button**
        > The staff can use this button to claim the ticket.
        ~ **Ticket subject:** $textInputValue[Reason]]
    $if[$channelExists[$getServerVar[tick_c]]==true]
    $let[id;$createChannel[$guildID;tick-$userTag;text;yes;$getServerVar[tick_c]]]
    $else
    $let[id;$createChannel[$guildID;tick-$userTag;text;yes]]
    $endif`
}]