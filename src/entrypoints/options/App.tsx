import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	type RecordTiming,
	getRecordTiming,
	getToken,
	saveRecordTiming,
	saveToken,
} from "@/utils/settings";
import { RecordTimingOption } from "./RecordTimingOption";

function App() {
	const [token, setToken] = useState<string>();

	const [recordTimingType, setRecordTimingType] =
		useState<RecordTiming["type"]>();
	const [continuedSeconds, setContinuedSeconds] = useState<number>();
	const [delaySeconds, setDelaySeconds] = useState<number>();

	const [saved, setSaved] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setToken((await getToken()) || "");

			const recordTiming = await getRecordTiming();
			setRecordTimingType(recordTiming.type);
			setContinuedSeconds(recordTiming.continuedSeconds);
			setDelaySeconds(recordTiming.delaySeconds);
		})();
	}, []);

	const handleSave = async () => {
		await saveToken(token || "");
		await saveRecordTiming(recordTimingType, continuedSeconds, delaySeconds);

		setSaved(true);
		setTimeout(() => {
			setSaved(false);
		}, 1000);
	};

	return (
		<div className="mx-6 mt-2 mb-8 text-base">
			<div>
				<Label className="font-bold text-base">Annict Token</Label>
				<Input
					value={token}
					onChange={(e) => setToken(e.target.value)}
					className="mt-2"
				/>
			</div>
			<RecordTimingOption
				type={recordTimingType}
				setType={setRecordTimingType}
				continuedSeconds={continuedSeconds}
				setContinuedSeconds={setContinuedSeconds}
				delaySeconds={delaySeconds}
				setDelaySeconds={setDelaySeconds}
			/>
			<Button onClick={handleSave} className="mt-6 w-20">
				{saved ? "Saved!" : "Save"}
			</Button>
		</div>
	);
}

export default App;
