import { supabase } from "./supabase";

export const insertData = async (data, user, time) => {
  const productionstatus = {
    userID: user.id,
    reviewID: +data.reviewID,
    PartyID: +data.PartyID,
    AnalystName: data.AnalystName,
    PRName: data.PRName,
    workStream: data.workStream,
    Queue: data.Queue,
    FinalRisk: data.FinalRisk,
    Status: data.Status,
    AuditFactor: data.AuditFactor,
    ActivityType: data.ActivityType,
    NoScreenings: +data.NoScreenings,
    comments: data.comments,
    cycleTime: time,
  };

  const { error } = await supabase
    .from("productionTracker")
    .insert([productionstatus])
    .select();

  if (error) throw new Error("Assignment could not be created");
};

export const getUserData = async (userid) => {
  const { data, error } = await supabase
    .from("productionTracker")
    .select("*")
    .eq("userID", userid);

  if (error) {
    alert("Data not available");
  }
  return data;
};
