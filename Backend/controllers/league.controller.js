import League from "../models/league.model.js";

export const getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json(leagues);
  } catch (error) {
    console.error("Error in getLeagues:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLeagueDetails = async (req, res) => {
  try {
    const { leagueName } = req.params;
    const league = await League.findOne({ name: new RegExp(`^${leagueName.replace(/-/g, " ")}$`, "i") });
    if (!league) {
      return res.status(404).json({ message: "League or club not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    console.error("Error in getLeagueDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const joinLeague = async (req, res) => {
  try {
    const { leagueId } = req.params;
    const userId = req.user._id;

    const league = await League.findById(leagueId);
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    if (league.membersList.includes(userId)) {
      return res.status(400).json({ message: "You are already a member of this league" });
    }

    league.membersList.push(userId);
    league.members += 1;
    league.active += 1; // Increment active for simplicity; adjust logic as needed
    await league.save();

    res.status(200).json({ message: "Joined league successfully" });
  } catch (error) {
    console.error("Error in joinLeague:", error);
    res.status(500).json({ message: "Server error" });
  }
};