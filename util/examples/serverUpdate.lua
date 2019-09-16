local HttpService = game:GetService('HttpService');
local Players = game:getService('Players');
local delay = 15;

local actions = {
    KICK = function(player)
        player:Kick("You were banned from the game.");
        end,
    KICK = function(player)
        player:Kick("You were kicked from the game.");
        end,
    MUTE = function(player)
        end
}

local recurse = function ()
    local api = "http://127.0.0.1/api/server/";
    local data = {
        players = Players,
        serverId = game.jobId:split(':')[2]
    };

    local response = HttpService:PostAsync(api, HttpService:JSONEncode(data));
    local json = HttpService:JSONDecode(response);
    for action in json.actions do
        local player = getPlayerByUserId(action.userId);
        actions[action.type](player);
    end
    
    wait(delay);
    recurse();
end

recurse();

Players.PlayerAdded:Connect(function(player)
    --request /users/get
    --check if banned
end)

local function getPlayerByUserId(userId)
	for _, player in pairs(Players:GetPlayers()) do
		if player.UserId == userId then
			return player;
		end
	end
end