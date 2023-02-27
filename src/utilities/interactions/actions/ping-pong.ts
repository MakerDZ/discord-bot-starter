import { CommandInteraction, Interaction } from "discord.js"
import reply_with_pong from "../../../components/reply-with-pong";

export default async function is_ping_pong(Interaction : Interaction){
    const interaction = Interaction as CommandInteraction;
    if(interaction.commandName === 'ping'){
        interaction.reply(reply_with_pong());
    }
}