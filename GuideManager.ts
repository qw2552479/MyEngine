module Hex {

    export interface GuideData {
        CMD: string;
        Data: any;
    }

    export const CMD_Start = "CMD_Start";
    export const CMD_Wait = "CMD_Wait";
    export const CMD_Sleep = "CMD_Sleep";   
    export const CMD_CommandEnd = "CMD_CommandEnd"; 
    export const CMD_FingerClick = "CMD_FingerClick";
    export const CMD_ShowPanel = "CMD_ShowPanel";
    export const CMD_ForceDrag = "CMD_ForceDrag";
    export const CMD_ForceReverse = "CMD_ForceReverse";
    export const CMD_NewBlocks = "CMD_NewBlocks";
    export const CMD_ForceGuideEnd = "CMD_ForceGuideEnd";
    export const CMD_End = "CMD_End";

    export module GuideManager {

        var m_commandQueue: Array<string[]> = [];
        var m_curGuideID: number;
    	export var m_forceDragEndCells: Cell[] = [];
        export var isSleeping = false;
        export var isForceReverse = false;

        export function isForceDrag() {
            return m_forceDragEndCells && m_forceDragEndCells.length > 0;
        }
        
        export function playGuide1() {

            addCommand(CMD_Start);

		    addCommand(CMD_NewBlocks + " 1,1");
		    addCommand(CMD_ForceDrag + " 6,3");
		    addCommand(CMD_Wait + " " + CMD_CommandEnd);
            
		    addCommand(CMD_NewBlocks + " 1,1");
		    addCommand(CMD_ForceDrag + " 8,3");
		    addCommand(CMD_Wait + " " + CMD_CommandEnd);
            
            addCommand(CMD_NewBlocks + " 1,2");
		    addCommand(CMD_ForceDrag + " 7,4");
		    addCommand(CMD_Wait + " " + CMD_CommandEnd);

            addCommand(CMD_NewBlocks + " 2,1,2");
            addCommand(CMD_FingerClick);
		    addCommand(CMD_Sleep + " 2000");
        	addCommand(CMD_Wait + " " + CMD_Sleep);

            addCommand(CMD_ForceReverse);
            addCommand(CMD_Wait + " " + CMD_CommandEnd);

            addCommand(CMD_ForceDrag + " 4,3,5,4");
            addCommand(CMD_Wait + " " + CMD_CommandEnd);

            addCommand(CMD_ForceGuideEnd);

            addCommand(CMD_End);

            execute();
        }

        export function playGuide2() {

            addCommand(CMD_Start);
		    
            addCommand(CMD_FingerClick + " White");
		    addCommand(CMD_Sleep + " 2000");
        	addCommand(CMD_Wait + " " + CMD_Sleep);

   		    addCommand(CMD_ShowPanel);
            addCommand(CMD_End);

            execute();
        }

        function addCommand(command: string) {
            var commands: string[] = command.split(/\[|\ |\]|\+/);
            m_commandQueue.push(commands);
        }

        function execute() {
            
            while (m_commandQueue.length > 0) {
                
                var commands: string[] = m_commandQueue[0];
                
                if (commands[0] == CMD_Wait) {
                    return;
                } else {
                    m_commandQueue.shift();
                    try
                    {
                        executeCommand(commands);
                    }
                    catch (e)
                    {
                        console.log(e);
                        finishGuide();
                    }
                }
            }
        }

        function executeCommand(commands: string[]) {
           
            console.log("executeCommand :" + commands[0]);
            switch (commands[0]) {
                case CMD_Start: break;
                case CMD_Sleep: {
                   isSleeping = true;
                    var sleepTime = parseFloat(commands[1]);
                    Laya.timer.once(sleepTime, this, function () {
                        isSleeping = false;
                        GuideManager.handleWaitingEvent(CMD_Sleep);   
                    })
                } break;
                case CMD_NewBlocks: {
                    
                    var params = commands[1].split(",");
                    var fillType = <FillType>parseInt(params[0]);
                    var blockTypes: BlockType[] = [];
                    
                    if (fillType == 1) {
                        blockTypes.push(parseInt(params[1]));
                    } else {
                        blockTypes.push(parseInt(params[1]));
                        blockTypes.push(parseInt(params[2]));
                    }
                   
                    GameLogic.newBlocksByType(fillType, blockTypes);
                } break;
                case CMD_ForceDrag: {
                    m_forceDragEndCells = [];

                    var cells = GameLogic.board.getCells();
                    var params = commands[1].split(",");
                    for (var i = 0; i < params.length; i = i + 2) {
                        var ix = parseInt(params[i]);
				        var iy = parseInt(params[i + 1]);
                        m_forceDragEndCells.push(cells[iy][ix]);
                        cells[iy][ix].baseBlock.setHighLight(true);
                    }

                    MainPanel.hudMain.moveCursor();
                } break;
                case CMD_ForceReverse: {
                    isForceReverse = true;
                    isSleeping = true;
                } break;
                case CMD_ForceGuideEnd: {
                    GameLogic.onForeceGuideEnd();
                } break;
                case CMD_FingerClick: {                    
                    MainPanel.hudMain.clickCursor(commands.length == 2);
                } break;
                case CMD_ShowPanel: {
                    MainPanel.showBombIntroducePanel();
                } break;
                case CMD_End: {
                    saveGuide(m_curGuideID);
                    finishGuide();
                } break;
                default: {
                    console.log("unknown cmd: " + commands[0]);
                } break;
            }
        }

        function finishGuide() {
            
            m_commandQueue = [];
            m_curGuideID = 0;
            m_forceDragEndCells = [];
        }

        function saveGuide(guideID: number) {
            
        }

        export function handleWaitingEvent(waitEvent: string) {
            if (m_commandQueue.length > 0) {
                var commands = m_commandQueue[0];
                if (commands[0] = "Wait")
                {
                    if (commands[1] != waitEvent)
                    {
                        return;
                    }
                    else
                    {
                        m_commandQueue.shift();
                        execute();
                    }
                }
            }
        }

        // guide is simple, so add guide data by hard code
        export function handleFirstEnterGame() {
            playGuide1();
        }

        export function handleFirstMergeWhiteStar() {
            playGuide2();  
        }

        export function handleForceReverse() {
            isSleeping = false;
            isForceReverse = false;
            handleWaitingEvent(CMD_CommandEnd);
        }
    }

}