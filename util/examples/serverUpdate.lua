local HttpService = game:GetService('HttpService');
local Players = game:getService('Players');
local delay = 15;

local actions = {
    BAN = function(player, infraction)
        local date = "meme";
        local length = "blah";
        player:Kick("You were banned from the game for ".. infraction.reason .." on ".. date ..". Your ban will last ".. length .." days.");
        end,
    KICK = function(player, infraction)
        player:Kick("You were kicked from the game.");
        end,
    MUTE = function(player)
        end
}

local function getPlayerByUserId(userId)
	for _, player in pairs(Players:GetPlayers()) do
		if player.UserId == userId then
			return player;
		end
	end
end

local function recurse()
    local api = "http://<redacted>:3000/api/server/";
	local players = {};
	local infractions = { --would be a table of infractions (ban, unban, etc) by server commands
		{
			type = "BAN",
			target = 84565287,
			executor = 2596467,
			reason = "teleporting",
			length = 100
		}
	};
	for _,player in pairs(Players:GetPlayers()) do
		table.insert(players, {
			username = player.Name,
			id = player.UserId
		});
	end
    local data = {
        players = players, --updates internal server cache
        serverId = game.JobId, --used to find player's server id and follow them
		infractions = infractions --sent to DB to log
    };
	print(HttpService:JSONEncode(data));
    local response = HttpService:PostAsync(api, HttpService:JSONEncode(data));
	local info = HttpService:JSONDecode(response);
	infractions = {}; --clear infractions so it wont send twice
	print(info);
	for _,action in pairs(info.actions) do
		--execute internal actions (ban from webpanel, etc)
		print(action);
	end
    wait(delay);
    recurse();
end

recurse();

Players.PlayerAdded:Connect(function(player)
    local api = "http://<redacted>:3000/api/users/".. player.UserId
    local response = HttpService:PostAsync(api);
    local info = HttpService:JSONDecode(response);
    print(info);
    if(info.user.banned) then
        actions["BAN"](player, info.infraction);
    end
end)