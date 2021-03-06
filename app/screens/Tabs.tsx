import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import TopBar from '../components/TopBar';
import { days, keys } from '../config/vars';
import { fetchHtml } from '../utils/fetchIssat';
import { getUpdateDate } from '../utils/getUpdateDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import {
	createStackNavigator,
	StackNavigationProp,
	TransitionPresets,
} from '@react-navigation/stack';
import { ParamList } from '../types';
import ScheduleAlt from './ScheduleAlt';
import TabHeader from '../components/AppTabBar/TabHeader';
import { FlatList } from 'react-native-gesture-handler';
import TodosContext from '../context/Todos/TodosContext';
import { add } from 'date-fns';

const checkForUpdate = async () => {
	const html = await fetchHtml(
		'http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php',
	);
	const lastUpdate = getUpdateDate(html);
	const lastSavedUpdate = await loadStateFromStorage<Date>(keys.LAST_UPDATE);
	if (!lastSavedUpdate || lastUpdate > lastSavedUpdate) {
		// show alert for update
		return true;
	}
	return false;
};

const ITEM_WIDTH = Dimensions.get('window').width;

type refType = FlatList<string> | null;
interface props {
	navigation: StackNavigationProp<ParamList, 'Tabs'>;
}

// creating modal stack
const Stack = createStackNavigator();

const Tabs: React.FC<props> = ({ navigation }) => {
	const subjectState = useContext(SubjectsContext);
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef<refType>(null);

	const [todoDays, setTodoDays] = useState<string[]>([]);
	const {
		state: { todos },
	} = useContext(TodosContext);

	useEffect(() => {
		let _days: string[] = [];
		todos.forEach(todo =>
			_days.includes(todo.day) ? null : (_days = [..._days, todo.day]),
		);
		setTodoDays(_days);
	}, [todos, setTodoDays]);

	const scrollTo = useCallback(
		(index: number, animated: boolean = true) => {
			flatListRef.current?.scrollToIndex({ index, animated });
		},
		[flatListRef.current?.scrollToIndex],
	);

	useEffect(() => {
		if (subjectState.state.loading) {
			return;
		}

		checkForUpdate().then(shouldUpdate => {
			if (shouldUpdate) {
				alert('should update data from site...');
				console.log('should update ...');
			} else {
				console.log('should not update ...');
			}
		});
	}, [subjectState.state.loading]);

	const dayTabs = useMemo(() => {
		const d = new Date();
		const todayIndex = d.getDay() - 1;
		// initial scroll
		scrollTo(todayIndex, true);

		return days.map((day, i) => {
			const dayDate = add(d, { days: i - todayIndex });
			return `${day}\n${dayDate.getDate()}`;
		});
	}, []);

	return (
		<>
			<TopBar onConfigPress={() => navigation.navigate('Settings')} />
			<View style={styles.container}>
				<TabHeader
					todoDays={todoDays}
					labels={dayTabs}
					scrollX={scrollX}
					onClick={scrollTo}
				/>
				<FlatList
					ref={flatListRef}
					initialScrollIndex={new Date().getDay() - 1}
					keyExtractor={(_, i) => i + ''}
					horizontal
					getItemLayout={(_, index) => ({
						length: ITEM_WIDTH,
						offset: ITEM_WIDTH * index,
						index,
					})}
					decelerationRate={'normal'}
					snapToAlignment='center'
					snapToInterval={ITEM_WIDTH}
					data={dayTabs}
					renderItem={day => (
						<ScheduleAlt
							navigation={navigation}
							dayIndex={day.index}
							haveTasks={todoDays.includes(days[day.index])}
						/>
					)}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						},
					)}
					scrollEventThrottle={16}
					disableIntervalMomentum
				/>
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
	},
});
export default Tabs;
