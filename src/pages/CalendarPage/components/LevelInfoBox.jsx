export default function LevelInfoBox({ coachRotations }) {
  const levelInfo = {
    pre3A: [],
    pre3B: [],
    pre45A: [],
    pre45B: [],
    whiteRibA: [],
    whiteRibB: [],
    redRibA: [],
    redRibB: [],
    blueRibA: [],
    blueRibB: [],
    bronzeMedA: [],
    bronzeMedB: [],
    silvMedA: [],
    silvMedB: [],
    begBoys: [],
    intBoys: [],
    begTumb: [],
    intTumb: [],
    cheerTumb: [],
    airAware: [],
    hotShotFoun: [],
    hotShotAdv: [],
    hotTots: [],
    xcelA: [],
    xcelSilver: [],
    xcelGold: [],
    level3: [],
    level4: [],
    optionalA: [],
    optionalB: [],
  };

  for (const coach of coachRotations) {
    for (const rotation of coach.rotations) {
      levelInfo[`${rotation.levelCode}`].push(coach.name + " ");
    }
  }

  return (
    <div>
      <div>Level: {}</div>
      <div>Coaches: {levelInfo["whiteRibA"]}</div>
    </div>
  );
}
