var CronJob = require('cron').CronJob;
let {bot, getAnnoucementChannel,updateDiscordStatus,getDiscordScheduledEvents, updateScheduledEvents} = require("../discord/init.js");
const eventMessages = require('../../editables/event_messages.js');
const config = require('../../editables/config.json');
const {GuildScheduledEventStatus} = require("discord.js");
let {getEventSchedule, updateSchedule} = require("../utility/checkEvents.js");

var tomorrowMessage = new CronJob('0 17 * * *', function() {
    if(!Object.prototype.hasOwnProperty.call(getEventSchedule(), "tomorrow")){return;}
    const tomorrowEvent = getEventSchedule()[getEventSchedule().tomorrow];
	getAnnoucementChannel().send({content: `<@&${config.skyblockID}> <@&${config.survivalID}>`, embeds: [eventMessages.eventTomorrow(tomorrowEvent.emote,tomorrowEvent.title,bot.user.avatarURL())]});
}, null, true, 'Asia/Taipei');
tomorrowMessage.start();


var todayMessageSkyblock = new CronJob('40 20 * * *', async function() {
    if(!Object.prototype.hasOwnProperty.call(getEventSchedule(), "today")){return;}
    const todayEvent = getEventSchedule()[getEventSchedule().today];
	getAnnoucementChannel().send(eventMessages.eventStart(todayEvent.emote,todayEvent.title,"21:00",config.skyblockID));
    const events = await getDiscordScheduledEvents();
    const currentEvent = events.at(0);
    currentEvent?.edit({name: currentEvent.name + " - 21:00正式開始"});
    currentEvent?.setStatus(GuildScheduledEventStatus.Active);
}, null, true, 'Asia/Taipei');
todayMessageSkyblock.start();

var todayMessageSurvival = new CronJob('40 21 * * *', async function() {
    if(!Object.prototype.hasOwnProperty.call(getEventSchedule(), "today")){return;}
    const todayEvent = getEventSchedule()[getEventSchedule().today];
	getAnnoucementChannel().send(eventMessages.eventStart(todayEvent.emote,todayEvent.title,"22:00",config.survivalID));
    const events = await getDiscordScheduledEvents();
    const currentEvent = events.at(0);
    currentEvent?.edit({name: currentEvent.name + " - 22:00正式開始"});
    currentEvent?.setStatus(GuildScheduledEventStatus.Active);
}, null, true, 'Asia/Taipei');
todayMessageSurvival.start();

var scheduleCheckEvent = new CronJob('1 0 * * *', function() {
    updateSchedule();
    updateDiscordStatus();
    updateScheduledEvents();	
}, null, true, 'Asia/Taipei');
scheduleCheckEvent.start();

var tomorrowMazeMessage = new CronJob('0 12 14 * *', function() {
    getAnnoucementChannel().send({content: `<@&${config.skyblockID}> <@&${config.survivalID}>`, embeds: [eventMessages.eventMazeTomorrow(bot.user.avatarURL())]});
}, null, true, 'Asia/Taipei');
tomorrowMazeMessage.start();

var todayMazeMessage = new CronJob('0 14 15 * *', function() {
    getAnnoucementChannel().send(eventMessages.eventMazeToday());
}, null, true, 'Asia/Taipei');
todayMazeMessage.start();
