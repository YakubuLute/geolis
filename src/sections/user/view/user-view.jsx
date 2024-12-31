import { useState, useEffect } from "react";
import { db } from "../../../config/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, getComparator } from "../utils";

import Iconify from "../../../component/Dashboard/iconify";
import Scrollbar from "../../../component/Dashboard/scrollbar";
import {
  showErrorToast,
  showToast,
} from "../../../component/shared/Toast/Toast";
import { useFireStoreContext } from "../../../context/FireStoreContext";

export default function UserPage() {
  const { userData: currentUser, isUserDataLoading } = useFireStoreContext();

  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          name:
            `${doc.data().firstName || ""} ${
              doc.data().lastName || ""
            }`.trim() ||
            doc.data().displayName ||
            "N/A",
          company: doc.data().organization || "N/A",
          role: doc.data().role || "User",
          isVerified: doc.data().emailVerified || false,
          status: doc.data().status || "active",
          avatarUrl:
            doc.data().photoURL || "/assets/images/avatars/avatar_default.jpg",
        }));
        setUsers(userData);
        setLoading(false);
        console.log("User data ", userData);
      },
      (error) => {
        console.error("Error fetching users:", error);
        showErrorToast(`Error fetching users: ${error.message}`);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = sortField === id && sortOrder === "asc";
    if (id !== "") {
      setSortOrder(isAsc ? "desc" : "asc");
      setSortField(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    if (currentUser.uid === userToDelete.id) {
      showErrorToast("You cannot delete yourself");
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      return;
    }

    // let's ensure that only admin can delete users
    if (currentUser.role !== "admin") {
      showErrorToast("Only admins can delete users");
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "users", userToDelete.id));
      showToast("User deleted successfully");

      if (selected.includes(userToDelete.name)) {
        setSelected(selected.filter((name) => name !== userToDelete.name));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast(`Error deleting user: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const applyFilter = (users, query) => {
    let filteredUsers = users;

    if (query) {
      filteredUsers = users.filter(
        (user) => user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    filteredUsers.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filteredUsers;
  };

  const dataFiltered = applyFilter(users, filterName);
  const notFound = !dataFiltered.length && !!filterName;

  if (loading || isUserDataLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Agents</Typography>

        <Button
          variant="contained"
          color="inherit"
          disabled
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Invite An Agent
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={sortOrder}
                orderBy={sortField}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "company", label: "Company" },
                  { id: "role", label: "Role" },
                  { id: "isVerified", label: "Verified", align: "center" },
                  { id: "status", label: "Status" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onDelete={handleDeleteClick}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the user "{userToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={isDeleting}
            autoFocus
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
