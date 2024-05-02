// todo.tsx
import {
    StyledCalendarWrapper,
    StyledCalendar,
    StyledDate,
    StyledToday,
    StyledDot,
    StyledAddButton,
} from "../styles/todostyle_test";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { useQuery } from "react-query";
import { getUserInfo } from "../api/login/getUserInfo";
import { getTodo } from "../api/todolist/getTodo";
import { deleteTodo } from "../api/todolist/deleteTodo";
import { IUserInfo } from "../interfaces/user";
import TodoListUnderCal from "../components/ToDo/TodoListUnderCal";
import { Modal_CreateTodo } from "../utils/modal/todo/Modal_CreateTodo";
import { Block, Margin, Text } from "../styles/ui";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
    const { data: user } = useQuery<IUserInfo>(["user"], getUserInfo);

    const today = new Date();
    const [date, setDate] = useState<Value>(today);
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [attendDay, setAttendDay] = useState<string[]>([]);
    const [todoList, setTodoList] = useState<any[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
    const [currentTodos, setCurrentTodos] = useState<any[]>([]);

    const handleTodayClick = () => {
        const today = new Date();
        setActiveStartDate(today);
        setDate(today);
    };

    useEffect(() => {
        if (user && user.roomId) {
            const fetchTodoList = async () => {
                try {
                    const response = await getTodo(user.roomId);
                    if (response) {
                        const todoList = await response.json();
                        setTodoList(todoList);
                        const todoDays = todoList.map((todo: any) => todo.date);
                        setAttendDay(todoDays);
                    } else {
                        console.error("할 일 목록을 가져오는 도중 오류가 발생했습니다: 응답이 없음");
                    }
                } catch (error) {
                    console.error("할 일 목록을 가져오는 도중 오류가 발생했습니다:", error);
                }
            };
            fetchTodoList();
        }
    }, [user]);

    const handleDateChange = (newDate: Value) => {
        let formattedNewDate: string | null;
        if (newDate instanceof Date) {
            formattedNewDate = moment(newDate).format("YYYY-MM-DD");
        } else {
            formattedNewDate = null;
        }
        setDate(newDate);
        setSelectedDate(formattedNewDate);

        if (formattedNewDate) {
            const filteredTodos = todoList.filter((todo: any) => todo.date === formattedNewDate);
            setFilteredTodos(filteredTodos);
        } else {
            setFilteredTodos([]);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            window.location.reload();
        } catch (error) {
            console.error("투두 삭제에 실패했습니다:", error);
        }
    };

    useEffect(() => {
        const todayFormatted = moment(today).format("YYYY-MM-DD");
        setSelectedDate(todayFormatted);
    }, []);

    // 수정: 날짜에 해당하는 투두가 없으면 filteredTodos를 빈 배열로 설정
    useEffect(() => {
        if (selectedDate) {
            const filteredTodos = todoList.filter((todo: any) => todo.date === selectedDate);
            setFilteredTodos(filteredTodos);
        } else {
            setFilteredTodos([]);
        }
    }, [selectedDate, todoList]);

    return (
        <>
            <StyledCalendarWrapper>
                <StyledCalendar
                    value={date}
                    onChange={handleDateChange}
                    formatDay={(locale, date) => moment(date).format("D")}
                    calendarType="gregory"
                    showNeighboringMonth={false}
                    next2Label={null}
                    prev2Label={null}
                    minDetail="year"
                    activeStartDate={activeStartDate === null ? undefined : activeStartDate}
                    onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
                    tileContent={({ date, view }) => {
                        let html = [];
                        if (view === "month" && attendDay.includes(moment(date).format("YYYY-MM-DD"))) {
                            html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
                        }
                        if (
                            view === "month" &&
                            date.getMonth() === today.getMonth() &&
                            date.getDate() === today.getDate()
                        ) {
                            html.push(<StyledToday key={"today"} />);
                        }
                        return <>{html}</>;
                    }}
                />
            </StyledCalendarWrapper>

            <Modal_CreateTodo
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                selectedDate={selectedDate}
                closeModal={handleCloseModal}
            />

            <Block.Box
                width="100%"
                height="38px"
                padding="0 14px 0 20px"
                justifyContent="space-between"
                alignItems="center"
                // border="1px solid red"
            >
                <Text.SemiBodyS>할 일 목록</Text.SemiBodyS>
                <StyledAddButton onClick={handleOpenModal}>
                    <Text.MediBodyB color="black">+</Text.MediBodyB>
                </StyledAddButton>
            </Block.Box>

            {/* 수정: 투두 목록이 있을 때만 TodoListUnderCal 컴포넌트 렌더링 */}
            {filteredTodos.length >= 0 && (
                <TodoListUnderCal todos={filteredTodos} onDeleteTodo={handleDeleteTodo} userList={[]} />
            )}

            <NavBar user={user} userInfo={user} />
        </>
    );
};
export default MyCalendar;
