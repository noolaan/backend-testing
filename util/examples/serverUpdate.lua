local httpService = game:GetService('HttpService');
local delay = 15;

local recurse = function ()
    
    --recurse functions
    wait(delay);
    recurse();
end

recurse();