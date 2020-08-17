import React from 'react';
import { Typography, makeStyles, Card, CardContent, Table, TableHead, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        marginBottom: 15,
      },
      content: {
        padding: 0,
      },
}));

const SupportTicketTableContent = (): JSX.Element => {


    return(
        <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Tên người gửi</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Loại khiếu nại</TableCell>
            <TableCell align="center">Nội dung</TableCell>
            <TableCell align="center">Ảnh</TableCell>
            <TableCell align="center">Ngày gửi</TableCell>
            <TableCell align="center">Xử lí bởi</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
    
        </TableHead>
      </Table>
    );
}

const SupportTicketTable = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant={'h2'} className={classes.title}>
                Duyệt khiếu nại
            </Typography>
            <Card>
                <CardContent className={classes.content}>
                <SupportTicketTableContent/>
                </CardContent>
            </Card>


        </div>
    )
}

export default SupportTicketTable;