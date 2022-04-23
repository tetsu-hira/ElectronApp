import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import allActions from '../actions';
import data from '../data';

import Button from './Button';
import Sita from './image/sita.svg';

const Item: React.FC = () => {
  const { item } = useParams<{ item: string }>();
  const [team, setTeam] = useState<string>('');
  const [plan, setPlan] = useState<Pro[]>([]);
  const [time1, setTime1] = useState<number>(0);
  const [time2, setTime2] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [win, setWin] = useState<number>(0);
  const [lose, setLose] = useState<number>(0);
  const [drawWin, setDrawWin] = useState<number>(0);
  const [drawDraw, setDrawDraw] = useState<number>(0);
  const [drawLose, setDrawLose] = useState<number>(0);
  const [sort, setSort] = useState<Sor | undefined>();

  const entryTeam = useSelector((state: RootState) => state.entryTeam);

  const controlMatch = useSelector((state: RootState) => state.controlMatch);

  const dispatch = useDispatch();
  const teamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (team) {
      if (team.length < 33) {
        setTeam(event.target.value);
        console.log(team);
      }
    }
  };

  const nullTeam = () => {
    setTeam(' ');
    console.log(team);
  };
  const defaultTeam = () => {
    setTeam(team.slice(1));
  };

  const param = window.location.hash;

  const List = entryTeam.teamList.filter((item: Param) => item.param === param);
  console.log(List);

  const Plan = controlMatch.matchList.filter((item: Mat) => item.param === param);
  console.log(Plan);

  const handleAddTimes = (index: number) => {
    const result: Pro[] = Plan.filter((plans: Mat) => {
      return plans.users === List[index].users;
    });
    const result1 = result.length + 1;
    List[index].times = result1;
    console.log('test');
  };
  const handleReduceTimes = (users: string) => {
    const result: Mat[] = Plan.filter((plans: Mat) => {
      return plans.users === users;
    });
    console.log(result);
    const result2 = List.find((List: Pro) => List.users === users);
    console.log(result2);
    result2.times = result.length - 1;
  };

  const KEYS = Object.keys(data);
  // console.log(KEYS);

  // ソート機能を実装
  const sortList = useMemo(() => {
    if (sort) {
      let _sortList = List;
      if (sort.key) {
        _sortList = _sortList.sort((a: string, b: string) => {
          a = a[sort.key];
          b = b[sort.key];

          if (a === b) {
            return 0;
          }
          if (a > b) {
            return 1 * sort.order;
          }
          if (a < b) {
            return -1 * sort.order;
          }
        });
      }
      return _sortList;
    }
  }, [sort]);
  // console.log(sort);
  const handleSort = (key: number) => {
    if (sort) {
      if (sort.key === key) {
        setSort({ ...sort, order: -sort.order });
      } else {
        setSort({
          key: key,
          order: -1,
        });
      }
    }
  };

  const handle1setPoint = (index: number, point: number) => {
    setTime1(point); //即時反映に必要なので消さない事
    console.log(Plan[index]);
    Plan[index].time1 = point;
    console.log(time1); //即時反映に必要なので消さない事
    if (index % 2 === 0) {
      if (Plan[index + 1]) {
        Plan[index].score =
          Plan[index].time1 + Plan[index].time2 - (Plan[index + 1].time1 + Plan[index + 1].time2);
        Plan[index + 1].score =
          Plan[index + 1].time1 + Plan[index + 1].time2 - (Plan[index].time1 + Plan[index].time2);
        setCount(Plan[index].score);
        if (
          Plan[index].time1 > Plan[index + 1].time1 &&
          Plan[index].time2 > Plan[index + 1].time2
        ) {
          console.log('勝ち勝ち');
          Plan[index].point = Number(win);
          Plan[index + 1].point = Number(lose);
        } else if (
          Plan[index].time1 < Plan[index + 1].time1 &&
          Plan[index].time2 < Plan[index + 1].time2
        ) {
          console.log('負け負け');
          Plan[index].point = Number(lose);
          Plan[index + 1].point = Number(win);
        } else if (
          (Plan[index].time1 < Plan[index + 1].time1 &&
            Plan[index].time2 > Plan[index + 1].time2) ||
          (Plan[index].time1 > Plan[index + 1].time1 && Plan[index].time2 < Plan[index + 1].time2)
        ) {
          if (
            Plan[index].time1 + Plan[index].time2 >
            Plan[index + 1].time1 + Plan[index + 1].time2
          ) {
            console.log('分け勝ち');
            Plan[index].point = Number(drawWin);
            Plan[index + 1].point = Number(drawLose);
          } else if (
            Plan[index].time1 + Plan[index].time2 <
            Plan[index + 1].time1 + Plan[index + 1].time2
          ) {
            console.log('分け負け');
            Plan[index].point = Number(drawLose);
            Plan[index + 1].point = Number(drawWin);
          } else {
            console.log('分け分け');
            Plan[index].point = Number(drawDraw);
            Plan[index + 1].point = Number(drawDraw);
          }
        } else {
          console.log('どちらでもなし');
          Plan[index].point = Number(lose);
          Plan[index + 1].point = Number(lose);
        }
      } else {
        alert('対戦相手が入力されていません');
      }
    } else {
      if (Plan[index - 1]) {
        Plan[index].score =
          Plan[index].time1 + Plan[index].time2 - (Plan[index - 1].time1 + Plan[index - 1].time2);
        Plan[index - 1].score =
          Plan[index - 1].time1 + Plan[index - 1].time2 - (Plan[index].time1 + Plan[index].time2);
        setCount(Plan[index].score);
        if (
          Plan[index].time1 > Plan[index - 1].time1 &&
          Plan[index].time2 > Plan[index - 1].time2
        ) {
          Plan[index].point = Number(win);
          Plan[index - 1].point = Number(lose);
        } else if (
          Plan[index].time1 < Plan[index - 1].time1 &&
          Plan[index].time2 < Plan[index - 1].time2
        ) {
          Plan[index].point = Number(lose);
          Plan[index - 1].point = Number(win);
        } else if (
          (Plan[index].time1 < Plan[index - 1].time1 &&
            Plan[index].time2 > Plan[index - 1].time2) ||
          (Plan[index].time1 > Plan[index - 1].time1 && Plan[index].time2 < Plan[index - 1].time2)
        ) {
          if (
            Plan[index].time1 + Plan[index].time2 >
            Plan[index - 1].time1 + Plan[index - 1].time2
          ) {
            Plan[index].point = Number(drawWin);
            Plan[index - 1].point = Number(drawLose);
          } else if (
            Plan[index].time1 + Plan[index].time2 <
            Plan[index - 1].time1 + Plan[index - 1].time2
          ) {
            Plan[index].point = Number(drawLose);
            Plan[index - 1].point = Number(drawWin);
          } else {
            Plan[index].point = Number(drawDraw);
            Plan[index - 1].point = Number(drawDraw);
          }
        } else {
          Plan[index].point = Number(lose);
          Plan[index - 1].point = Number(lose);
        }
      } else {
        alert('対戦相手が入力されていません');
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      // const countPlan: Pro | undefined = List.find((elem: Pro) => List[i] === elem);
      // console.log(countPlan);
      // 得失点の合計値をtotalに代入
      const targetPlan: Mat[] = Plan.filter((plans: Mat) => {
        return plans.users === List[i].users;
      });
      console.log(targetPlan);
      // Planの中の合計値を計算してListに反映
      List[i].score = targetPlan.reduce((sumScore: number, plans: Mat) => {
        console.log(plans);
        return sumScore + Number(plans.score);
      }, 0);
      console.log(i + 1 + 'のscoreは' + List[i].score);
      // 勝ち点の合計値をamountに代入
      List[i].point = targetPlan.reduce((sumPoint: number, plans: Mat) => {
        return sumPoint + Number(plans.point);
      }, 0);
      console.log(i + 1 + 'のpointは' + List[i].point);
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log('ここからエラー回避');
    console.log(time1);
    console.log(count);
  };
  const handle2setPoint = (index: number, point: number) => {
    setTime2(point); //即時反映に必要なので消さない事
    console.log(Plan[index]);
    Plan[index].time2 = point;
    console.log(time2); //即時反映に必要なので消さない事
    if (index % 2 === 0) {
      if (Plan[index + 1]) {
        Plan[index].score =
          Plan[index].time1 + Plan[index].time2 - (Plan[index + 1].time1 + Plan[index + 1].time2);
        Plan[index + 1].score =
          Plan[index + 1].time1 + Plan[index + 1].time2 - (Plan[index].time1 + Plan[index].time2);
        setCount(Plan[index].score);
        if (
          Plan[index].time1 > Plan[index + 1].time1 &&
          Plan[index].time2 > Plan[index + 1].time2
        ) {
          console.log('勝ち勝ち');
          Plan[index].point = Number(win);
          Plan[index + 1].point = Number(lose);
        } else if (
          Plan[index].time1 < Plan[index + 1].time1 &&
          Plan[index].time2 < Plan[index + 1].time2
        ) {
          console.log('負け負け');
          Plan[index].point = Number(lose);
          Plan[index + 1].point = Number(win);
        } else if (
          (Plan[index].time1 < Plan[index + 1].time1 &&
            Plan[index].time2 > Plan[index + 1].time2) ||
          (Plan[index].time1 > Plan[index + 1].time1 && Plan[index].time2 < Plan[index + 1].time2)
        ) {
          if (
            Plan[index].time1 + Plan[index].time2 >
            Plan[index + 1].time1 + Plan[index + 1].time2
          ) {
            console.log('分け勝ち');
            Plan[index].point = Number(drawWin);
            Plan[index + 1].point = Number(drawLose);
          } else if (
            Plan[index].time1 + Plan[index].time2 <
            Plan[index + 1].time1 + Plan[index + 1].time2
          ) {
            console.log('分け負け');
            Plan[index].point = Number(drawLose);
            Plan[index + 1].point = Number(drawWin);
          } else {
            console.log('分け分け');
            Plan[index].point = Number(drawDraw);
            Plan[index + 1].point = Number(drawDraw);
          }
        } else {
          console.log('どちらでもなし');
          Plan[index].point = Number(lose);
          Plan[index + 1].point = Number(lose);
        }
      } else {
        alert('対戦相手が入力されていません');
      }
    } else {
      if (Plan[index - 1]) {
        Plan[index].score =
          Plan[index].time1 + Plan[index].time2 - (Plan[index - 1].time1 + Plan[index - 1].time2);
        Plan[index - 1].score =
          Plan[index - 1].time1 + Plan[index - 1].time2 - (Plan[index].time1 + Plan[index].time2);
        setCount(Plan[index].score);
        if (
          Plan[index].time1 > Plan[index - 1].time1 &&
          Plan[index].time2 > Plan[index - 1].time2
        ) {
          Plan[index].point = Number(win);
          Plan[index - 1].point = Number(lose);
        } else if (
          Plan[index].time1 < Plan[index - 1].time1 &&
          Plan[index].time2 < Plan[index - 1].time2
        ) {
          Plan[index].point = Number(lose);
          Plan[index - 1].point = Number(win);
        } else if (
          (Plan[index].time1 < Plan[index - 1].time1 &&
            Plan[index].time2 > Plan[index - 1].time2) ||
          (Plan[index].time1 > Plan[index - 1].time1 && Plan[index].time2 < Plan[index - 1].time2)
        ) {
          if (
            Plan[index].time1 + Plan[index].time2 >
            Plan[index - 1].time1 + Plan[index - 1].time2
          ) {
            Plan[index].point = Number(drawWin);
            Plan[index - 1].point = Number(drawLose);
          } else if (
            Plan[index].time1 + Plan[index].time2 <
            Plan[index - 1].time1 + Plan[index - 1].time2
          ) {
            Plan[index].point = Number(drawLose);
            Plan[index - 1].point = Number(drawWin);
          } else {
            Plan[index].point = Number(drawDraw);
            Plan[index - 1].point = Number(drawDraw);
          }
        } else {
          Plan[index].point = Number(lose);
          Plan[index - 1].point = Number(lose);
        }
      } else {
        alert('対戦相手が入力されていません');
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      // const countPlan: Pro | undefined = List.find((elem: Pro) => List[i] === elem);
      // console.log(countPlan);
      // 得失点の合計値をtotalに代入
      const targetPlan: Mat[] = Plan.filter((plans: Mat) => {
        return plans.users === List[i].users;
      });
      console.log(targetPlan);
      // Planの中の合計値を計算してListに反映
      List[i].score = targetPlan.reduce((sumScore: number, plans: Mat) => {
        console.log(plans);
        return sumScore + Number(plans.score);
      }, 0);
      console.log(i + 1 + 'のscoreは' + List[i].score);
      // 勝ち点の合計値をamountに代入
      List[i].point = targetPlan.reduce((sumPoint: number, plans: Mat) => {
        return sumPoint + Number(plans.point);
      }, 0);
      console.log(i + 1 + 'のpointは' + List[i].point);
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log('ここからエラー回避');
    console.log(time2);
    console.log(count);
  };

  const addTime1 = (index: number, minute: number) => {
    const targetPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index] === elem);
    if (targetPlan) {
      targetPlan.time1 = targetPlan.time1 + minute;
      setTime1(targetPlan.time1);
      // 奇数か偶数で処理を変える
      if (index % 2 === 0) {
        const nextPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index + 1] === elem);
        if (nextPlan) {
          targetPlan.score =
            targetPlan.time1 + targetPlan.time2 - (nextPlan.time1 + nextPlan.time2);
          nextPlan.score = nextPlan.time1 + nextPlan.time2 - (targetPlan.time1 + targetPlan.time2);
          setCount(targetPlan.score);
          if (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 > nextPlan.time2) {
            targetPlan.point = Number(win);
            nextPlan.point = Number(lose);
          } else if (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 < nextPlan.time2) {
            targetPlan.point = Number(lose);
            nextPlan.point = Number(win);
          } else if (
            (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 > nextPlan.time2) ||
            (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 < nextPlan.time2)
          ) {
            if (targetPlan.time1 + targetPlan.time2 > nextPlan.time1 + nextPlan.time2) {
              targetPlan.point = Number(drawWin);
              nextPlan.point = Number(drawLose);
            } else if (targetPlan.time1 + targetPlan.time2 < nextPlan.time1 + nextPlan.time2) {
              targetPlan.point = Number(drawLose);
              nextPlan.point = Number(drawWin);
            } else {
              targetPlan.point = Number(drawDraw);
              nextPlan.point = Number(drawDraw);
            }
          } else {
            targetPlan.point = Number(lose);
            nextPlan.point = Number(lose);
          }
        }
      } else {
        const prevPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index - 1] === elem);
        if (prevPlan) {
          targetPlan.score =
            targetPlan.time1 + targetPlan.time2 - (prevPlan.time1 + prevPlan.time2);
          prevPlan.score = prevPlan.time1 + prevPlan.time2 - (targetPlan.time1 + targetPlan.time2);
          setCount(targetPlan.score);
          if (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 > prevPlan.time2) {
            targetPlan.point = Number(win);
            prevPlan.point = Number(lose);
          } else if (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 < prevPlan.time2) {
            targetPlan.point = Number(lose);
            prevPlan.point = Number(win);
          } else if (
            (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 > prevPlan.time2) ||
            (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 < prevPlan.time2)
          ) {
            if (targetPlan.time1 + targetPlan.time2 > prevPlan.time1 + prevPlan.time2) {
              targetPlan.point = Number(drawWin);
              prevPlan.point = Number(drawLose);
            } else if (targetPlan.time1 + targetPlan.time2 < prevPlan.time1 + prevPlan.time2) {
              targetPlan.point = Number(drawLose);
              prevPlan.point = Number(drawWin);
            } else {
              targetPlan.point = Number(drawDraw);
              prevPlan.point = Number(drawDraw);
            }
          } else {
            targetPlan.point = Number(lose);
            prevPlan.point = Number(lose);
          }
        }
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      const countPlan: Pro | undefined = List.find((elem: Pro) => List[i] === elem);
      // 得失点の合計値をtotalに代入
      const sumCount: Pro[] = plan.filter((plans) => {
        if (countPlan) {
          return plans.users === countPlan.users;
        }
      });
      const total = sumCount.reduce(function (sum: number, element: Pro) {
        return sum + element.count;
      }, 0);
      // 合計をListに反映
      const update: Pro = List.find((elem: Pro) => {
        if (countPlan) {
          elem.users === countPlan.users;
        }
      });
      update.score = total;
      // 勝ち点の合計値をamountに代入
      const sumpoint: Mat[] = Plan.filter((plans: Mat) => {
        if (countPlan) {
          return plans.users === countPlan.users;
        }
      });
      const amount = sumpoint.reduce(function (sum: number, element: Mat) {
        return sum + element.point;
      }, 0);
      // 合計をListに反映
      const overwrite: Pro = List.find((elem: Pro) => {
        if (countPlan) {
          elem.users === countPlan.users;
        }
      });
      overwrite.point = amount;
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log('ここからエラー回避');
    console.log(time1);
    console.log(count);
  };
  const addTime2 = (index: number, minute: number) => {
    const targetPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index] === elem);
    if (targetPlan) {
      targetPlan.time2 = targetPlan.time2 + minute;
      setTime2(targetPlan.time2);
      // 奇数か偶数で処理を変える
      if (index % 2 === 0) {
        const nextPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index + 1] === elem);
        if (nextPlan) {
          targetPlan.score =
            targetPlan.time1 + targetPlan.time2 - (nextPlan.time1 + nextPlan.time2);
          nextPlan.score = nextPlan.time1 + nextPlan.time2 - (targetPlan.time1 + targetPlan.time2);
          setCount(targetPlan.score);
          if (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 > nextPlan.time2) {
            targetPlan.point = Number(win);
            nextPlan.point = Number(lose);
          } else if (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 < nextPlan.time2) {
            targetPlan.point = Number(lose);
            nextPlan.point = Number(win);
          } else if (
            (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 > nextPlan.time2) ||
            (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 < nextPlan.time2)
          ) {
            if (targetPlan.time1 + targetPlan.time2 > nextPlan.time1 + nextPlan.time2) {
              targetPlan.point = Number(drawWin);
              nextPlan.point = Number(drawLose);
            } else if (targetPlan.time1 + targetPlan.time2 < nextPlan.time1 + nextPlan.time2) {
              targetPlan.point = Number(drawLose);
              nextPlan.point = Number(drawWin);
            } else {
              targetPlan.point = Number(drawDraw);
              nextPlan.point = Number(drawDraw);
            }
          } else {
            targetPlan.point = Number(lose);
            nextPlan.point = Number(lose);
          }
        }
      } else {
        const prevPlan: Mat | undefined = Plan.find((elem: Mat) => Plan[index - 1] === elem);
        if (prevPlan) {
          targetPlan.score =
            targetPlan.time1 + targetPlan.time2 - (prevPlan.time1 + prevPlan.time2);
          prevPlan.score = prevPlan.time1 + prevPlan.time2 - (targetPlan.time1 + targetPlan.time2);
          setCount(targetPlan.score);
          if (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 > prevPlan.time2) {
            targetPlan.point = Number(win);
            prevPlan.point = Number(lose);
          } else if (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 < prevPlan.time2) {
            targetPlan.point = Number(lose);
            prevPlan.point = Number(win);
          } else if (
            (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 > prevPlan.time2) ||
            (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 < prevPlan.time2)
          ) {
            if (targetPlan.time1 + targetPlan.time2 > prevPlan.time1 + prevPlan.time2) {
              targetPlan.point = Number(drawWin);
              prevPlan.point = Number(drawLose);
            } else if (targetPlan.time1 + targetPlan.time2 < prevPlan.time1 + prevPlan.time2) {
              targetPlan.point = Number(drawLose);
              prevPlan.point = Number(drawWin);
            } else {
              targetPlan.point = Number(drawDraw);
              prevPlan.point = Number(drawDraw);
            }
          } else {
            targetPlan.point = Number(lose);
            prevPlan.point = Number(lose);
          }
        }
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      const countPlan: Pro = List.find((elem: Pro) => List[i] === elem);
      // 得失点の合計値をtotalに代入
      const sumCount: Mat[] = Plan.filter((plans: Mat) => {
        return plans.users === countPlan.users;
      });
      const total = sumCount.reduce(function (sum: number, element: Mat) {
        return sum + element.score;
      }, 0);
      // 合計をListに反映
      const update: Pro = List.find((elem: Pro) => elem.users === countPlan.users);
      update.score = total;
      // 勝ち点の合計値をamountに代入
      const sumpoint: Mat[] = Plan.filter((plans: Mat) => {
        return plans.users === countPlan.users;
      });
      const amount = sumpoint.reduce(function (sum: number, element: Mat) {
        return sum + element.point;
      }, 0);
      // 合計をListに反映
      const overwrite: Pro = List.find((elem: Pro) => elem.users === countPlan.users);
      overwrite.point = amount;
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log(time2);
    console.log(count);
  };

  const changeWin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWin(Number(event.target.value));
    setLose(0);
  };
  const changeDrawWin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawWin(Number(event.target.value));
  };
  const changeDrawDraw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawDraw(Number(event.target.value));
  };
  const changeDrawLose = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawLose(Number(event.target.value));
  };

  return (
    <>
      <div className='Product'>
        <div className='ProductTitle'>【{item}】</div>
        <div className='ProductContainer'>
          <div className='ProductTop'>
            <div className='ProductButton'>
              <input
                className='ProductButton__name'
                type='text'
                id='name'
                onChange={teamName}
                value={!team ? '参加するチームを入力' : team}
                onBlur={defaultTeam}
                onClick={nullTeam}
              ></input>
              <button
                className='ProductButton__button'
                onClick={() => {
                  dispatch(allActions.teamAction.addTeam(team, param));
                }}
              >
                Entry
              </button>
            </div>
            <div className='Insert'>
              <div className='InsertContent'>
                <div className='InsertContent__text'>WW</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='win'
                  onChange={changeWin}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DW</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_win'
                  onChange={changeDrawWin}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DD</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_draw'
                  onChange={changeDrawDraw}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DL</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_lose'
                  onChange={changeDrawLose}
                ></input>
              </div>
            </div>
          </div>
          <div className='Item'>
            <div className='ItemHead id'>No.</div>
            {KEYS.map((key, index: number) => (
              <Button key={index} button={key} sort={sort} handleSort={handleSort}></Button>
            ))}
          </div>
          {entryTeam.teamList.length > 0 && (
            <ul className='List'>
              {List.map((team: Pro, index: number) => (
                <li key={index} className='ListTop'>
                  <div className='ListBody id'>{index + 1}</div>
                  <div className='ListBody users'>
                    {team.users}
                    <button
                      className='ListButton'
                      onClick={() => dispatch(allActions.matchAction.addMatch(team.users, param))}
                      onMouseUp={() => handleAddTimes(index)}
                    >
                      <img src={Sita} alt='↓' width='23px' height='16px' />
                    </button>
                  </div>
                  <div className='ListBody point'>{team.point}</div>
                  <div className='ListBody score'>{team.score}</div>
                  <div className='ListBody times'>{team.times}</div>
                  <div className='ListBody ratio'>{team.ratio}</div>
                  <div className='ListBody count'>{team.count}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {Plan.length > 0 && (
        <div className='Result'>
          {Plan.map((item: Mat, index: number) => (
            <div className='Result__Border' key={index}>
              <div className='Result__Flex' key={index}>
                <div className={index % 2 === 0 ? 'Flex left' : 'Flex right'} key={index}>
                  {index % 2 === 0 && (
                    <div className='FlexNumber'>
                      <div className='FlexNumber__item'>No.{index / 2 + 1}</div>
                    </div>
                  )}
                  {index % 2 === 0 && (
                    <button
                      className='DeleteButton'
                      onClick={() => dispatch(allActions.matchAction.removeMatch(Plan, index))}
                      onMouseUp={() => handleReduceTimes(item.users)}
                    >
                      Del
                    </button>
                  )}
                  <div className='FlexCross'>
                    {index % 2 !== 0 && <div className='FlexCross__item'>-</div>}
                    {index % 2 !== 0 && <div className='FlexCross__item'>-</div>}
                  </div>
                  <div className='FlexCount'>
                    {index % 2 !== 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time1}</div>
                      </div>
                    )}
                    {index % 2 !== 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time2}</div>
                      </div>
                    )}
                  </div>
                  <div className='FlexCount'>
                    {index % 2 !== 0 && (
                      <div className='FlexCount__Button'>
                        <button
                          className='AddCount top'
                          onClick={() =>
                            handle1setPoint(index, window.myAPI.counter(index, item.time1, 5))
                          }
                        >
                          +
                        </button>
                        <button
                          className='SubCount top'
                          onClick={() =>
                            handle1setPoint(index, window.myAPI.counter(index, item.time1, -1))
                          }
                        >
                          -
                        </button>
                      </div>
                    )}
                    {index % 2 !== 0 && (
                      <div className='FlexCount__Button'>
                        <button
                          className='AddCount bottom'
                          onClick={() =>
                            handle2setPoint(index, window.myAPI.counter(index, item.time2, 5))
                          }
                        >
                          <div className='operator'>+</div>
                        </button>
                        <button
                          className='SubCount bottom'
                          onClick={() =>
                            handle2setPoint(index, window.myAPI.counter(index, item.time2, -1))
                          }
                        >
                          <div className='operator'>-</div>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='FlexName'>
                    <div className='ResultName'>
                      <p className='ResultName__text'>{item.users}</p>
                    </div>
                  </div>
                  <div className='FlexCount'>
                    {index % 2 === 0 && (
                      <div className='FlexCount__Button'>
                        <button
                          className='SubCount top'
                          onClick={() =>
                            handle1setPoint(index, window.myAPI.counter(index, item.time1, -1))
                          }
                        >
                          -
                        </button>
                        <button
                          className='AddCount top'
                          onClick={() =>
                            handle1setPoint(index, window.myAPI.counter(index, item.time1, 5))
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                    {index % 2 === 0 && (
                      <div className='FlexCount__Button'>
                        <button
                          className='SubCount bottom'
                          onClick={() =>
                            handle2setPoint(index, window.myAPI.counter(index, item.time2, -1))
                          }
                        >
                          -
                        </button>
                        <button
                          className='AddCount bottom'
                          onClick={() =>
                            handle2setPoint(index, window.myAPI.counter(index, item.time2, 5))
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='FlexCount'>
                    {index % 2 === 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time1}</div>
                      </div>
                    )}

                    {index % 2 === 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time2}</div>
                      </div>
                    )}
                  </div>
                  {index % 2 !== 0 && (
                    <button
                      className='DeleteButton'
                      onClick={() => dispatch(allActions.matchAction.removeMatch(Plan, index))}
                      onMouseUp={() => handleReduceTimes(item.users)}
                    >
                      Del
                    </button>
                  )}
                </div>
                {index % 2 === 0 && (
                  <div className='Cross'>
                    <div className='Cross__item'>
                      <div className='Cross__text'>-</div>
                    </div>
                    <div className='Cross__item'>
                      <div className='Cross__text'>-</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Item;
