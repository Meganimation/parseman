import { useState, useCallback, useEffect, useRef } from 'react';
import './Table.css'
import styled from 'styled-components';

const DyanmicTable = styled.table` {
  width: 100%;
  display: grid;
  overflow: auto;
  grid-template-columns: ${(props: { gridTemplateColumns: string }) => props.gridTemplateColumns};
`

const createHeaders = (headers: any) => {
  return headers.map((item: any) => ({
      text: item,
      ref: useRef(),
  }));
}

export const Table = ({
    headers,
    minCellWidth,
    tableContent,
    onClick = () => { },
}: ITableProps) => {

  const gridTemplateColumnsCSS = () =>{

    let arr = [];
    for (let i = 0; i < headers.length; i++) {
        arr.push(`minmax(${minCellWidth}px, 1fr)`);
    }
    // setGridTemplateColumns(arr.join(' '))
    return arr.join(' ');
    
}

console.log('HEY', headers)


    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(null);
    const [gridTemplateColumns, setGridTemplateColumns] = useState('minmax(100px, 1fr)');
    const tableElement = useRef(null);
    



    const columns = createHeaders(headers);

    const mouseMove = useCallback(
        (e) => {

          const gridColumns = columns.map((col: any, i: any) => {
            if (i === activeIndex) {
              const width = e.clientX - col.ref.current.offsetLeft;
              if (width >= minCellWidth) {
                return `${width}px`;
              }
            }
            return `${col.ref.current.offsetWidth}px`;
          });
         setGridTemplateColumns(gridColumns.join(' '))
        },
        [activeIndex, columns, minCellWidth]
      );

      const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
      }, [mouseMove]);

      const mouseDown = (index: any) => {
        setActiveIndex(index);
      }

    
      const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
      }, [setActiveIndex, removeListeners]);
    
      useEffect(() => {
        if (activeIndex !== null) {
          window.addEventListener("mousemove", mouseMove);
          window.addEventListener("mouseup", mouseUp);
        }
    
        return () => {
          removeListeners();
        };
      }, [activeIndex, mouseMove, mouseUp, removeListeners]);
  
    

    useEffect(() => {
        {/* @ts-ignore */ }
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    useEffect(() => {
        if (activeIndex !== null) {
          window.addEventListener('mousemove', mouseMove);
          window.addEventListener('mouseup', mouseUp);
        }
      
        return () => {
          removeListeners();
        }
      }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <div className="table-wrapper">
            <DyanmicTable className="resizeable-table" ref={tableElement} gridTemplateColumns={gridTemplateColumns}>
                <thead>
                    <tr>
                        {/* @ts-ignore */}
                        {columns.map(({ ref, text }, i) => (
                            <th ref={ref} key={text}>
                                <span>{text}</span>
                                <div
                                    style={{ height: tableHeight }}
                                    onMouseDown={() => mouseDown(i)}
                                    className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                {tableContent}
            </DyanmicTable>
        </div>
    );
};

interface ITableProps {
    onClick?: any;
    headers: string[];
    minCellWidth: any;
    tableContent: any;
}
